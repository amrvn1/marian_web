# LvlUp Setup Script
# Run this from PowerShell as Administrator

Write-Host "================================" -ForegroundColor Cyan
Write-Host "LvlUp Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✓ $pythonVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found. Please install Python 3.9+ from python.org" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "✓ $pgVersion found" -ForegroundColor Green
} catch {
    Write-Host "⚠ PostgreSQL not found or not in PATH" -ForegroundColor Yellow
    Write-Host "  Please ensure PostgreSQL is installed and added to PATH" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setting up Backend..." -ForegroundColor Cyan

# Backend setup
Set-Location "backend"

# Create virtual environment
if (-Not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "✓ Virtual environment created" -ForegroundColor Green
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

# Install Python dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Create .env file if it doesn't exist
if (-Not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host "⚠ IMPORTANT: Edit backend\.env with your database credentials" -ForegroundColor Yellow
}

Set-Location ".."

Write-Host ""
Write-Host "Setting up Frontend..." -ForegroundColor Cyan

# Frontend setup
Set-Location "frontend-react"

# Install npm dependencies
Write-Host "Installing npm dependencies (this may take a few minutes)..." -ForegroundColor Yellow
npm install
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Create .env file if it doesn't exist
if (-Not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
}

Set-Location ".."

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Set up PostgreSQL database (see IMPLEMENTATION_GUIDE.md)" -ForegroundColor White
Write-Host "2. Edit backend\.env with your database credentials" -ForegroundColor White
Write-Host "3. Run backend: cd backend && .\venv\Scripts\Activate.ps1 && python app.py" -ForegroundColor White
Write-Host "4. Run frontend (in new window): cd frontend-react && npm start" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see:" -ForegroundColor Yellow
Write-Host "- IMPLEMENTATION_GUIDE.md (Complete guide)" -ForegroundColor White
Write-Host "- QUICKSTART.md (Quick reference)" -ForegroundColor White
Write-Host "- README.md (API documentation)" -ForegroundColor White
Write-Host ""
