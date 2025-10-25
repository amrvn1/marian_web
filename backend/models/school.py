from . import db, generate_uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON

class School(db.Model):
    __tablename__ = 'schools'
    
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(255), nullable=False, index=True)
    description = db.Column(db.Text)
    location = db.Column(db.String(255))
    contact_info = db.Column(JSON)  # {email, phone, website}
    photo_gallery = db.Column(JSON)  # Array of image URLs
    interview_fee = db.Column(db.Numeric(10, 2), nullable=False)
    about = db.Column(db.Text)
    is_live = db.Column(db.Boolean, default=False)
    created_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Payout settings
    payout_method = db.Column(db.String(50))  # 'bank' or 'mobile_money'
    payout_details = db.Column(JSON)  # Bank account or mobile money details
    
    # Relationships
    interview_slots = db.relationship('InterviewSlot', backref='school', lazy='dynamic', cascade='all, delete-orphan')
    applicants = db.relationship('Applicant', backref='school', lazy='dynamic', cascade='all, delete-orphan')
    payouts = db.relationship('Payout', backref='school', lazy='dynamic', cascade='all, delete-orphan')
    
    def to_dict(self, include_slots=False):
        """Convert school object to dictionary"""
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'location': self.location,
            'contact_info': self.contact_info,
            'photo_gallery': self.photo_gallery,
            'interview_fee': float(self.interview_fee) if self.interview_fee else 0,
            'about': self.about,
            'is_live': self.is_live,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
        
        if include_slots:
            data['available_slots'] = [slot.to_dict() for slot in self.interview_slots.filter_by(is_active=True).all()]
        
        return data
    
    def get_available_slots_count(self):
        """Get total available slots"""
        total = 0
        for slot in self.interview_slots.filter_by(is_active=True).all():
            total += (slot.total_slots - slot.booked_slots)
        return total
