from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.school import School
from models.interview_slot import InterviewSlot
from models.user import User
from datetime import datetime

schools_bp = Blueprint('schools', __name__)

@schools_bp.route('/', methods=['GET'])
def get_schools():
    """Get all schools with optional filters"""
    try:
        # Get query parameters
        location = request.args.get('location')
        search = request.args.get('search')
        is_live = request.args.get('is_live', 'true').lower() == 'true'
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        
        # Build query
        query = School.query
        
        if is_live:
            query = query.filter_by(is_live=True)
        
        if location:
            query = query.filter(School.location.ilike(f'%{location}%'))
        
        if search:
            query = query.filter(
                db.or_(
                    School.name.ilike(f'%{search}%'),
                    School.description.ilike(f'%{search}%')
                )
            )
        
        # Paginate results
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        
        schools = [school.to_dict() for school in pagination.items]
        
        return jsonify({
            'schools': schools,
            'total': pagination.total,
            'page': page,
            'per_page': per_page,
            'pages': pagination.pages
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@schools_bp.route('/<school_id>', methods=['GET'])
def get_school(school_id):
    """Get single school by ID with available slots"""
    try:
        school = School.query.get(school_id)
        
        if not school:
            return jsonify({'error': 'School not found'}), 404
        
        return jsonify({'school': school.to_dict(include_slots=True)}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@schools_bp.route('/', methods=['POST'])
@jwt_required()
def create_school():
    """Create a new school (school_admin or super_admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or user.role not in ['school_admin', 'super_admin']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'location', 'interview_fee']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new school
        school = School(
            name=data['name'],
            description=data.get('description'),
            location=data['location'],
            contact_info=data.get('contact_info', {}),
            photo_gallery=data.get('photo_gallery', []),
            interview_fee=data['interview_fee'],
            about=data.get('about'),
            is_live=data.get('is_live', False),
            created_by=user_id
        )
        
        db.session.add(school)
        db.session.commit()
        
        return jsonify({
            'message': 'School created successfully',
            'school': school.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@schools_bp.route('/<school_id>', methods=['PUT'])
@jwt_required()
def update_school(school_id):
    """Update school details (owner or super_admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        school = School.query.get(school_id)
        
        if not school:
            return jsonify({'error': 'School not found'}), 404
        
        # Check authorization
        if user.role != 'super_admin' and school.created_by != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Update fields
        if 'name' in data:
            school.name = data['name']
        if 'description' in data:
            school.description = data['description']
        if 'location' in data:
            school.location = data['location']
        if 'contact_info' in data:
            school.contact_info = data['contact_info']
        if 'photo_gallery' in data:
            school.photo_gallery = data['photo_gallery']
        if 'interview_fee' in data:
            school.interview_fee = data['interview_fee']
        if 'about' in data:
            school.about = data['about']
        if 'is_live' in data:
            school.is_live = data['is_live']
        if 'payout_method' in data:
            school.payout_method = data['payout_method']
        if 'payout_details' in data:
            school.payout_details = data['payout_details']
        
        db.session.commit()
        
        return jsonify({
            'message': 'School updated successfully',
            'school': school.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@schools_bp.route('/<school_id>/slots', methods=['POST'])
@jwt_required()
def add_interview_slot(school_id):
    """Add interview slot to school"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        school = School.query.get(school_id)
        
        if not school:
            return jsonify({'error': 'School not found'}), 404
        
        # Check authorization
        if user.role != 'super_admin' and school.created_by != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        if 'date' not in data or 'total_slots' not in data:
            return jsonify({'error': 'date and total_slots are required'}), 400
        
        # Parse date
        slot_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        
        # Create new slot
        slot = InterviewSlot(
            school_id=school_id,
            date=slot_date,
            total_slots=data['total_slots'],
            is_active=data.get('is_active', True)
        )
        
        db.session.add(slot)
        db.session.commit()
        
        return jsonify({
            'message': 'Interview slot added successfully',
            'slot': slot.to_dict()
        }), 201
        
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@schools_bp.route('/<school_id>/slots/<slot_id>', methods=['PUT'])
@jwt_required()
def update_interview_slot(school_id, slot_id):
    """Update interview slot"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        school = School.query.get(school_id)
        slot = InterviewSlot.query.get(slot_id)
        
        if not school or not slot:
            return jsonify({'error': 'School or slot not found'}), 404
        
        # Check authorization
        if user.role != 'super_admin' and school.created_by != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Update fields
        if 'total_slots' in data:
            slot.total_slots = data['total_slots']
        if 'is_active' in data:
            slot.is_active = data['is_active']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Slot updated successfully',
            'slot': slot.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@schools_bp.route('/my-schools', methods=['GET'])
@jwt_required()
def get_my_schools():
    """Get schools owned by current user"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or user.role not in ['school_admin', 'super_admin']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        schools = School.query.filter_by(created_by=user_id).all()
        
        return jsonify({
            'schools': [school.to_dict() for school in schools]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
