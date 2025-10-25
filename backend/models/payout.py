from . import db, generate_uuid
from datetime import datetime

class Payout(db.Model):
    __tablename__ = 'payouts'
    
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    school_id = db.Column(db.String(36), db.ForeignKey('schools.id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.Enum('pending', 'processed', 'failed', name='payout_status'), default='pending')
    payout_date = db.Column(db.Date)
    reference_number = db.Column(db.String(255), unique=True)
    applicant_count = db.Column(db.Integer, default=0)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    processed_at = db.Column(db.DateTime)
    
    def to_dict(self):
        """Convert payout object to dictionary"""
        return {
            'id': self.id,
            'school_id': self.school_id,
            'amount': float(self.amount) if self.amount else 0,
            'status': self.status,
            'payout_date': self.payout_date.isoformat() if self.payout_date else None,
            'reference_number': self.reference_number,
            'applicant_count': self.applicant_count,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'processed_at': self.processed_at.isoformat() if self.processed_at else None
        }
