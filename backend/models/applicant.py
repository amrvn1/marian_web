from . import db, generate_uuid
from datetime import datetime

class Applicant(db.Model):
    __tablename__ = 'applicants'
    
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    school_id = db.Column(db.String(36), db.ForeignKey('schools.id'), nullable=False)
    slot_id = db.Column(db.String(36), db.ForeignKey('interview_slots.id'), nullable=False)
    student_name = db.Column(db.String(255), nullable=False)
    dob = db.Column(db.Date)
    prior_school = db.Column(db.String(255))
    parent_email = db.Column(db.String(255))
    parent_phone = db.Column(db.String(20))
    photo_url = db.Column(db.String(500))
    payment_status = db.Column(db.Enum('pending', 'paid', 'failed', name='payment_status'), default='pending')
    transaction_id = db.Column(db.String(255), unique=True)
    payment_provider = db.Column(db.String(50))  # 'selcom' or 'azampesa'
    amount_paid = db.Column(db.Numeric(10, 2))
    confirmation_pdf = db.Column(db.String(500))
    booking_id = db.Column(db.String(20), unique=True, index=True)  # Unique booking reference
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    paid_at = db.Column(db.DateTime)
    
    def to_dict(self):
        """Convert applicant object to dictionary"""
        return {
            'id': self.id,
            'school_id': self.school_id,
            'slot_id': self.slot_id,
            'student_name': self.student_name,
            'dob': self.dob.isoformat() if self.dob else None,
            'prior_school': self.prior_school,
            'parent_email': self.parent_email,
            'parent_phone': self.parent_phone,
            'photo_url': self.photo_url,
            'payment_status': self.payment_status,
            'transaction_id': self.transaction_id,
            'payment_provider': self.payment_provider,
            'amount_paid': float(self.amount_paid) if self.amount_paid else 0,
            'confirmation_pdf': self.confirmation_pdf,
            'booking_id': self.booking_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'paid_at': self.paid_at.isoformat() if self.paid_at else None
        }
    
    def mark_as_paid(self, transaction_id, amount, provider):
        """Mark applicant as paid"""
        self.payment_status = 'paid'
        self.transaction_id = transaction_id
        self.amount_paid = amount
        self.payment_provider = provider
        self.paid_at = datetime.utcnow()
