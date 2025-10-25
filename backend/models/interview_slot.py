from . import db, generate_uuid
from datetime import datetime

class InterviewSlot(db.Model):
    __tablename__ = 'interview_slots'
    
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    school_id = db.Column(db.String(36), db.ForeignKey('schools.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    total_slots = db.Column(db.Integer, nullable=False, default=0)
    booked_slots = db.Column(db.Integer, nullable=False, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    applicants = db.relationship('Applicant', backref='slot', lazy='dynamic')
    
    def to_dict(self):
        """Convert slot object to dictionary"""
        return {
            'id': self.id,
            'school_id': self.school_id,
            'date': self.date.isoformat() if self.date else None,
            'total_slots': self.total_slots,
            'booked_slots': self.booked_slots,
            'available_slots': self.total_slots - self.booked_slots,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def is_available(self):
        """Check if slot has available capacity"""
        return self.is_active and self.booked_slots < self.total_slots
    
    def book_slot(self):
        """Increment booked slots"""
        if self.is_available():
            self.booked_slots += 1
            return True
        return False
