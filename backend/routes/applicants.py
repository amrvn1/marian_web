from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.applicant import Applicant
from models.school import School
from models.interview_slot import InterviewSlot
from models.user import User
from werkzeug.utils import secure_filename
import os
import random
import string
from datetime import datetime

applicants_bp = Blueprint('applicants', __name__)

def generate_booking_id():
    """Generate unique booking ID"""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

@applicants_bp.route('/book', methods=['POST'])
def create_booking():
    """Create a new interview booking"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['school_id', 'slot_id', 'student_name']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Verify school and slot exist
        school = School.query.get(data['school_id'])
        slot = InterviewSlot.query.get(data['slot_id'])
        
        if not school or not slot:
            return jsonify({'error': 'School or interview slot not found'}), 404
        
        if not slot.is_available():
            return jsonify({'error': 'No available slots for this date'}), 400
        
        # Parse DOB if provided
        dob = None
        if data.get('dob'):
            dob = datetime.strptime(data['dob'], '%Y-%m-%d').date()
        
        # Generate unique booking ID
        booking_id = generate_booking_id()
        while Applicant.query.filter_by(booking_id=booking_id).first():
            booking_id = generate_booking_id()
        
        # Create applicant record
        applicant = Applicant(
            school_id=data['school_id'],
            slot_id=data['slot_id'],
            student_name=data['student_name'],
            dob=dob,
            prior_school=data.get('prior_school'),
            parent_email=data.get('parent_email'),
            parent_phone=data.get('parent_phone'),
            photo_url=data.get('photo_url'),
            booking_id=booking_id,
            payment_status='pending'
        )
        
        db.session.add(applicant)
        db.session.commit()
        
        return jsonify({
            'message': 'Booking created successfully',
            'applicant': applicant.to_dict(),
            'booking_id': booking_id
        }), 201
        
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@applicants_bp.route('/<applicant_id>', methods=['GET'])
def get_applicant(applicant_id):
    """Get applicant details by ID"""
    try:
        applicant = Applicant.query.get(applicant_id)
        
        if not applicant:
            return jsonify({'error': 'Applicant not found'}), 404
        
        # Include school and slot details
        applicant_data = applicant.to_dict()
        applicant_data['school'] = applicant.school.to_dict()
        applicant_data['slot'] = applicant.slot.to_dict()
        
        return jsonify({'applicant': applicant_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@applicants_bp.route('/by-booking/<booking_id>', methods=['GET'])
def get_applicant_by_booking_id(booking_id):
    """Get applicant details by booking ID"""
    try:
        applicant = Applicant.query.filter_by(booking_id=booking_id).first()
        
        if not applicant:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Include school and slot details
        applicant_data = applicant.to_dict()
        applicant_data['school'] = applicant.school.to_dict()
        applicant_data['slot'] = applicant.slot.to_dict()
        
        return jsonify({'applicant': applicant_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@applicants_bp.route('/school/<school_id>', methods=['GET'])
@jwt_required()
def get_school_applicants(school_id):
    """Get all applicants for a school (school admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        school = School.query.get(school_id)
        
        if not school:
            return jsonify({'error': 'School not found'}), 404
        
        # Check authorization
        if user.role != 'super_admin' and school.created_by != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Get query parameters
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 50))
        payment_status = request.args.get('payment_status')
        search = request.args.get('search')
        
        # Build query
        query = Applicant.query.filter_by(school_id=school_id)
        
        if payment_status:
            query = query.filter_by(payment_status=payment_status)
        
        if search:
            query = query.filter(
                db.or_(
                    Applicant.student_name.ilike(f'%{search}%'),
                    Applicant.booking_id.ilike(f'%{search}%')
                )
            )
        
        # Order by created date
        query = query.order_by(Applicant.created_at.desc())
        
        # Paginate
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        
        applicants = []
        for applicant in pagination.items:
            app_data = applicant.to_dict()
            app_data['slot_date'] = applicant.slot.date.isoformat() if applicant.slot else None
            applicants.append(app_data)
        
        return jsonify({
            'applicants': applicants,
            'total': pagination.total,
            'page': page,
            'per_page': per_page,
            'pages': pagination.pages
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@applicants_bp.route('/school/<school_id>/stats', methods=['GET'])
@jwt_required()
def get_school_stats(school_id):
    """Get statistics for a school"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        school = School.query.get(school_id)
        
        if not school:
            return jsonify({'error': 'School not found'}), 404
        
        # Check authorization
        if user.role != 'super_admin' and school.created_by != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Calculate stats
        total_applicants = Applicant.query.filter_by(school_id=school_id).count()
        paid_applicants = Applicant.query.filter_by(school_id=school_id, payment_status='paid').count()
        pending_applicants = Applicant.query.filter_by(school_id=school_id, payment_status='pending').count()
        
        # Calculate total revenue
        paid_apps = Applicant.query.filter_by(school_id=school_id, payment_status='paid').all()
        total_revenue = sum([float(app.amount_paid or 0) for app in paid_apps])
        
        return jsonify({
            'stats': {
                'total_applicants': total_applicants,
                'paid_applicants': paid_applicants,
                'pending_applicants': pending_applicants,
                'total_revenue': total_revenue
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
