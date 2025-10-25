from flask import Blueprint, request, jsonify
from models import db
from models.applicant import Applicant
from models.school import School
from models.interview_slot import InterviewSlot
from services.payment_service import SelcomPaymentService, AzampesaPaymentService
from services.pdf_service import generate_confirmation_pdf
import os

payments_bp = Blueprint('payments', __name__)

# Platform fees configuration
PLATFORM_FEE_PERCENT = 5  # 5% platform fee
TRANSACTION_FEE = 500  # Fixed transaction fee in TZS

def calculate_total_fees(interview_fee):
    """Calculate total fees including platform and transaction fees"""
    interview_fee = float(interview_fee)
    platform_fee = interview_fee * (PLATFORM_FEE_PERCENT / 100)
    total = interview_fee + platform_fee + TRANSACTION_FEE
    
    return {
        'interview_fee': interview_fee,
        'platform_fee': platform_fee,
        'transaction_fee': TRANSACTION_FEE,
        'total': total
    }

@payments_bp.route('/calculate-fees', methods=['POST'])
def calculate_fees():
    """Calculate total payment fees"""
    try:
        data = request.get_json()
        
        if 'interview_fee' not in data:
            return jsonify({'error': 'interview_fee is required'}), 400
        
        fees = calculate_total_fees(data['interview_fee'])
        
        return jsonify({'fees': fees}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/initiate', methods=['POST'])
def initiate_payment():
    """Initiate payment with Selcom or Azampesa"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['applicant_id', 'provider', 'phone_number']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Get applicant
        applicant = Applicant.query.get(data['applicant_id'])
        if not applicant:
            return jsonify({'error': 'Applicant not found'}), 404
        
        # Check if already paid
        if applicant.payment_status == 'paid':
            return jsonify({'error': 'Payment already completed'}), 400
        
        # Get school and calculate fees
        school = applicant.school
        fees = calculate_total_fees(school.interview_fee)
        
        # Initialize payment service based on provider
        provider = data['provider'].lower()
        
        if provider == 'selcom':
            payment_service = SelcomPaymentService(
                api_key=os.getenv('SELCOM_API_KEY'),
                api_secret=os.getenv('SELCOM_API_SECRET')
            )
        elif provider == 'azampesa':
            payment_service = AzampesaPaymentService(
                api_key=os.getenv('AZAMPESA_API_KEY'),
                api_secret=os.getenv('AZAMPESA_API_SECRET')
            )
        else:
            return jsonify({'error': 'Invalid payment provider'}), 400
        
        # Create payment session
        payment_response = payment_service.create_payment(
            amount=fees['total'],
            phone_number=data['phone_number'],
            reference=applicant.booking_id,
            description=f"Interview fee for {school.name}"
        )
        
        if not payment_response.get('success'):
            return jsonify({
                'error': 'Payment initiation failed',
                'details': payment_response.get('message')
            }), 400
        
        # Store payment info in applicant record
        applicant.payment_provider = provider
        db.session.commit()
        
        return jsonify({
            'message': 'Payment initiated successfully',
            'payment_data': payment_response,
            'booking_id': applicant.booking_id
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/webhook/selcom', methods=['POST'])
def selcom_webhook():
    """Handle Selcom payment webhook"""
    try:
        data = request.get_json()
        
        # Verify webhook authenticity (implement signature verification in production)
        
        # Extract payment details
        reference = data.get('reference')  # This is the booking_id
        status = data.get('status')
        transaction_id = data.get('transaction_id')
        amount = data.get('amount')
        
        # Find applicant by booking_id
        applicant = Applicant.query.filter_by(booking_id=reference).first()
        
        if not applicant:
            return jsonify({'error': 'Applicant not found'}), 404
        
        if status == 'success' or status == 'completed':
            # Mark as paid
            applicant.mark_as_paid(transaction_id, amount, 'selcom')
            
            # Book the slot
            slot = applicant.slot
            slot.book_slot()
            
            # Generate PDF confirmation
            pdf_path = generate_confirmation_pdf(applicant)
            applicant.confirmation_pdf = pdf_path
            
            db.session.commit()
            
            return jsonify({'message': 'Payment processed successfully'}), 200
        else:
            applicant.payment_status = 'failed'
            db.session.commit()
            
            return jsonify({'message': 'Payment failed'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/webhook/azampesa', methods=['POST'])
def azampesa_webhook():
    """Handle Azampesa payment webhook"""
    try:
        data = request.get_json()
        
        # Verify webhook authenticity (implement signature verification in production)
        
        # Extract payment details
        reference = data.get('reference')  # This is the booking_id
        status = data.get('status')
        transaction_id = data.get('transaction_id')
        amount = data.get('amount')
        
        # Find applicant by booking_id
        applicant = Applicant.query.filter_by(booking_id=reference).first()
        
        if not applicant:
            return jsonify({'error': 'Applicant not found'}), 404
        
        if status == 'success' or status == 'completed':
            # Mark as paid
            applicant.mark_as_paid(transaction_id, amount, 'azampesa')
            
            # Book the slot
            slot = applicant.slot
            slot.book_slot()
            
            # Generate PDF confirmation
            pdf_path = generate_confirmation_pdf(applicant)
            applicant.confirmation_pdf = pdf_path
            
            db.session.commit()
            
            return jsonify({'message': 'Payment processed successfully'}), 200
        else:
            applicant.payment_status = 'failed'
            db.session.commit()
            
            return jsonify({'message': 'Payment failed'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/verify/<booking_id>', methods=['GET'])
def verify_payment(booking_id):
    """Verify payment status by booking ID"""
    try:
        applicant = Applicant.query.filter_by(booking_id=booking_id).first()
        
        if not applicant:
            return jsonify({'error': 'Booking not found'}), 404
        
        return jsonify({
            'booking_id': booking_id,
            'payment_status': applicant.payment_status,
            'transaction_id': applicant.transaction_id,
            'amount_paid': float(applicant.amount_paid) if applicant.amount_paid else 0,
            'confirmation_pdf': applicant.confirmation_pdf
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
