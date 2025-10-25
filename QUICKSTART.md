# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
```bash
# Check Python version (should be 3.9+)
python --version

# Check Node.js version (should be 18+)
node --version

# Check PostgreSQL (should be 14+)
psql --version
```

### Backend Setup (3 minutes)

```bash
# 1. Navigate to backend
cd backend

# 2. Create virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create .env file
copy .env.example .env  # Windows
# OR
cp .env.example .env  # Mac/Linux

# 5. Create database
# Open psql and run:
# CREATE DATABASE school_interview_db;

# 6. Update DATABASE_URL in .env
# Example: postgresql://postgres:password@localhost:5432/school_interview_db

# 7. Run the server
python app.py
```

Backend will be running at: **http://localhost:5000**

### Frontend Setup (2 minutes)

```bash
# 1. Open new terminal and navigate to frontend
cd frontend-react

# 2. Install dependencies
npm install

# 3. Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# 4. Start dev server
npm start
```

Frontend will be running at: **http://localhost:3000**

## 🧪 Test the Setup

### 1. Check Backend Health
Open browser: http://localhost:5000/api/health

Should return: `{"status": "healthy"}`

### 2. Create Test User (via API)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test Admin",
    "email": "admin@test.com",
    "password": "password123",
    "role": "school_admin"
  }'
```

### 3. Create Test School
```bash
# First, login to get JWT token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'

# Copy the access_token from response

# Create school (replace YOUR_TOKEN)
curl -X POST http://localhost:5000/api/schools \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Marian Secondary School",
    "location": "Dar es Salaam",
    "interview_fee": 50000,
    "description": "Leading secondary school in Tanzania",
    "is_live": true
  }'
```

## 📝 Common Issues

### Issue: Database Connection Error
**Solution**: 
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in .env
3. Verify database exists: `psql -l`

### Issue: Module Not Found
**Solution**: 
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Issue: Port Already in Use
**Solution**: 
```bash
# Find process using port 5000
# Windows:
netstat -ano | findstr :5000

# Mac/Linux:
lsof -i :5000

# Kill the process
# Windows:
taskkill /PID <PID> /F

# Mac/Linux:
kill -9 <PID>
```

### Issue: CORS Error in Frontend
**Solution**: 
1. Check backend CORS configuration in `app.py`
2. Ensure frontend URL is in CORS_ORIGINS

## 🎯 Next Steps

1. **Review API Documentation**: Check README.md for all available endpoints
2. **Test Payment Flow**: Integrate with Selcom/Azampesa sandbox
3. **Customize Branding**: Update school logos and colors
4. **Deploy**: Follow deployment guide in README.md

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Material UI Components](https://mui.com/material-ui/getting-started/)

## 💡 Development Tips

### Hot Reload
- Backend: Flask auto-reloads in debug mode
- Frontend: React auto-reloads on save

### Database Reset
```bash
# Drop and recreate database
dropdb school_interview_db
createdb school_interview_db
python app.py  # Tables will be created automatically
```

### View Database
```bash
# Connect to database
psql school_interview_db

# List tables
\dt

# View table structure
\d users
\d schools
\d applicants

# Query data
SELECT * FROM users;
SELECT * FROM schools;
```

### API Testing Tools
- **Postman**: Import API collection for easy testing
- **curl**: Command-line testing (examples above)
- **Browser DevTools**: Test frontend API calls

## 🤝 Need Help?

- **Documentation**: See README.md
- **Issues**: Check common issues above
- **Support**: Email development team

---

Happy Coding! 🎉
