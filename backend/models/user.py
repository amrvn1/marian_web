from . import db, generate_uuid
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    full_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('student', 'school_admin', 'super_admin', name='user_roles'), nullable=False, default='student')
    language_preference = db.Column(db.String(2), default='en')  # 'en' or 'sw'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    schools = db.relationship('School', backref='owner', lazy='dynamic')
    
    def set_password(self, password):
        """Hash and set the user's password"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Verify the user's password"""
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        """Convert user object to dictionary"""
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'role': self.role,
            'language_preference': self.language_preference,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
