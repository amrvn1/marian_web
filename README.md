# School Interview Payment Platform

A bilingual (English/Swahili) web platform for Tanzanian schools that allows parents and students to discover schools, book interviews, and pay using mobile money (Selcom, Azampesa). Schools can manage interview schedules, view paid applicants, and receive payouts automatically.

## 🚀 Features

### For Students/Parents
- **School Discovery**: Search and filter schools by location and GPA ranking
- **Interview Booking**: Book interview slots at preferred schools
- **Mobile Money Payment**: Pay interview fees via Selcom or Azampesa
- **PDF Confirmation**: Download booking confirmation with QR code
- **Bilingual Support**: Switch between English and Swahili

### For School Administrators
- **School Profile Management**: Update school information, photos, and contact details
- **Interview Slot Management**: Add/edit interview dates and capacity
- **Applicant Tracking**: View and filter paid applicants
- **Data Export**: Export applicant data as PDF/CSV
- **Payout Management**: Set up bank/mobile money payout details

### For Platform Admins
- **School Approval**: Review and approve new schools
- **User Management**: Manage all platform users
- **Analytics**: View platform-wide statistics and metrics

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Selcom & Azampesa APIs
- **PDF Generation**: ReportLab + QR codes
- **File Storage**: Local /uploads (can be extended to AWS S3)

### Frontend
- **Framework**: React.js with TypeScript
- **UI Library**: Material UI
- **State Management**: Redux Toolkit
- **Internationalization**: react-i18next (English & Swahili)
- **Routing**: React Router
- **Forms**: Formik + Yup validation

### Deployment
- **Backend**: Render or Railway
- **Frontend**: Vercel or Netlify
- **Database**: Supabase or Neon.tech

## 📋 Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## 🔧 Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your actual configuration
```

### 5. Initialize database
```bash
# Create PostgreSQL database
createdb school_interview_db

# Run migrations (tables will be created automatically on first run)
python app.py
```

### 6. Run the backend server
```bash
python app.py
# Server will run on http://localhost:5000
```

## 🎨 Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend-react
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure environment
```bash
# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 4. Run development server
```bash
npm start
# or
yarn start
# App will run on http://localhost:3000
```

## 📁 Project Structure

```
MARIAN WEB/
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── school.py
│   │   ├── interview_slot.py
│   │   ├── applicant.py
│   │   └── payout.py
│   ├── routes/
│   │   ├── auth.py
│   │   ├── schools.py
│   │   ├── applicants.py
│   │   ├── payments.py
│   │   └── admin.py
│   ├── services/
│   │   ├── payment_service.py
│   │   └── pdf_service.py
│   ├── uploads/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
├── frontend-react/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   ├── i18n/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update user profile

### Schools
- `GET /api/schools` - List all schools (with filters)
- `GET /api/schools/:id` - Get school details
- `POST /api/schools` - Create school (auth required)
- `PUT /api/schools/:id` - Update school (auth required)
- `POST /api/schools/:id/slots` - Add interview slot (auth required)
- `GET /api/schools/my-schools` - Get user's schools (auth required)

### Applicants
- `POST /api/applicants/book` - Create booking
- `GET /api/applicants/:id` - Get applicant details
- `GET /api/applicants/by-booking/:booking_id` - Get by booking ID
- `GET /api/applicants/school/:school_id` - Get school applicants (auth required)
- `GET /api/applicants/school/:school_id/stats` - Get school stats (auth required)

### Payments
- `POST /api/payments/calculate-fees` - Calculate payment fees
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/webhook/selcom` - Selcom webhook
- `POST /api/payments/webhook/azampesa` - Azampesa webhook
- `GET /api/payments/verify/:booking_id` - Verify payment status

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats (super admin)
- `GET /api/admin/schools/pending` - Get pending schools (super admin)
- `POST /api/admin/schools/:id/approve` - Approve school (super admin)
- `GET /api/admin/users` - Get all users (super admin)

## 💳 Payment Integration

### Selcom Setup
1. Register at [Selcom Developer Portal](https://developer.selcommobile.com/)
2. Get API Key and API Secret
3. Add credentials to `.env` file
4. Configure webhook URL: `https://your-domain.com/api/payments/webhook/selcom`

### Azampesa Setup
1. Register at Azampesa merchant portal
2. Get API Key and API Secret
3. Add credentials to `.env` file
4. Configure callback URL: `https://your-domain.com/api/payments/webhook/azampesa`

## 🚀 Deployment

### Backend (Render/Railway)
1. Create new web service
2. Connect GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Add environment variables from `.env.example`
6. Deploy

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_API_URL`
5. Deploy

### Database (Supabase/Neon)
1. Create new PostgreSQL database
2. Copy connection string
3. Update `DATABASE_URL` in backend environment variables

## 📊 Database Schema

### Users
- id, full_name, email, password_hash, role, language_preference, created_at

### Schools
- id, name, description, location, contact_info, photo_gallery, interview_fee, about, is_live, created_by, payout_method, payout_details, created_at

### Interview Slots
- id, school_id, date, total_slots, booked_slots, is_active, created_at

### Applicants
- id, school_id, slot_id, student_name, dob, prior_school, parent_email, parent_phone, photo_url, payment_status, transaction_id, amount_paid, confirmation_pdf, booking_id, created_at, paid_at

### Payouts
- id, school_id, amount, status, payout_date, reference_number, applicant_count, created_at, processed_at

## 🔒 Security Considerations

- All passwords are hashed using Werkzeug's security module
- JWT tokens for secure authentication
- CORS configured to allow only specific origins
- SQL injection prevention through SQLAlchemy ORM
- Input validation on all endpoints
- Webhook signature verification for payment callbacks
- Important: The root-level demo pages (`frontend.html`, `login.js`) use localStorage for convenience and are NOT production-ready. Do not use them for real authentication. Use the React app (`frontend-react/`) which should authenticate with JWT and store tokens in HTTP-only cookies.

## 🌐 Internationalization

The platform supports English and Swahili:
- User language preference stored in database
- Frontend uses react-i18next for translations
- All user-facing content has translations

## 📝 License

This project is proprietary software for Marian School Platform.

## 👥 Support

For support, email support@schoolinterviews.tz or contact the development team.

## 🎯 MVP Metrics

### Primary KPI
- Number of active schools

### Secondary KPIs
- Number of successful payments
- Average applicants per school
- Platform adoption rate

---

Built with ❤️ for Tanzanian Schools
