from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from models.user import User
from models.school import School
from models.interview_slot import InterviewSlot
from models.applicant import Applicant
from models.payout import Payout
import os
from datetime import timedelta

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://localhost/school_interview_db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB max file size
    
    # Initialize extensions
    db.init_app(app)
    # CORS: allow local dev and optional production frontend origin via env FRONTEND_ORIGIN
    allowed_origins = [
        os.getenv('FRONTEND_ORIGIN', ''),
        'http://localhost:3000',
        'http://localhost:5173'
    ]
    allowed_origins = [o for o in allowed_origins if o]
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}})
    jwt = JWTManager(app)
    
    # Create upload folder if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.schools import schools_bp
    from routes.applicants import applicants_bp
    from routes.payments import payments_bp
    from routes.admin import admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(schools_bp, url_prefix='/api/schools')
    app.register_blueprint(applicants_bp, url_prefix='/api/applicants')
    app.register_blueprint(payments_bp, url_prefix='/api/payments')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    @app.route('/')
    def index():
        return {'message': 'LvlUp API', 'status': 'running'}
    
    @app.route('/api/health')
    def health():
        return {'status': 'healthy'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
