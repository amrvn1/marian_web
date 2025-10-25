from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.user import User
from models.school import School
from models.payout import Payout
from datetime import datetime, timedelta

admin_bp = Blueprint('admin', __name__)

def require_super_admin(func):
    """Decorator to require super admin role"""
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or user.role != 'super_admin':
            return jsonify({'error': 'Unauthorized. Super admin access required.'}), 403
        
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper

@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
@require_super_admin
def get_dashboard_stats():
    """Get platform-wide statistics"""
    try:
        # Count totals
        total_schools = School.query.count()
        active_schools = School.query.filter_by(is_live=True).count()
        total_users = User.query.count()
        
        # Get recent schools
        recent_schools = School.query.order_by(School.created_at.desc()).limit(5).all()
        
        return jsonify({
            'stats': {
                'total_schools': total_schools,
                'active_schools': active_schools,
                'total_users': total_users
            },
            'recent_schools': [school.to_dict() for school in recent_schools]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/schools/pending', methods=['GET'])
@jwt_required()
@require_super_admin
def get_pending_schools():
    """Get schools pending approval"""
    try:
        pending_schools = School.query.filter_by(is_live=False).all()
        
        return jsonify({
            'schools': [school.to_dict() for school in pending_schools]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/schools/<school_id>/approve', methods=['POST'])
@jwt_required()
@require_super_admin
def approve_school(school_id):
    """Approve a school"""
    try:
        school = School.query.get(school_id)
        
        if not school:
            return jsonify({'error': 'School not found'}), 404
        
        school.is_live = True
        db.session.commit()
        
        return jsonify({
            'message': 'School approved successfully',
            'school': school.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@require_super_admin
def get_all_users():
    """Get all users"""
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 50))
        
        pagination = User.query.paginate(page=page, per_page=per_page, error_out=False)
        
        users = [user.to_dict() for user in pagination.items]
        
        return jsonify({
            'users': users,
            'total': pagination.total,
            'page': page,
            'per_page': per_page,
            'pages': pagination.pages
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
