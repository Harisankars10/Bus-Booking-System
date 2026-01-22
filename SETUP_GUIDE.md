# Bus Booking System - Setup & Run Guide

This guide will help you set up and run both the backend and frontend of the Bus Booking System.

## Prerequisites

### For Backend:
- Python 3.8 or higher
- MySQL Server installed and running
- pip (Python package manager)

### For Frontend:
- Node.js 14 or higher
- npm (comes with Node.js)

## Step-by-Step Setup

### Part 1: Backend Setup

#### Step 1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2: Create Virtual Environment
**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Set Up MySQL Database

1. **Start MySQL Server** (if not already running)

2. **Create the Database:**
   - Open MySQL Command Line or MySQL Workbench
   - Run:
   ```sql
   CREATE DATABASE busdb;
   ```

3. **Create `.env` File:**
   - Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
   (On Linux/Mac: `cp .env.example .env`)

4. **Edit `.env` File** with your MySQL credentials:
   ```
   FLASK_ENV=development
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key-here
   DATABASE_USER=root
   DATABASE_PASSWORD=your-mysql-password
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_NAME=busdb
   ```

#### Step 5: Initialize Database Tables
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

#### Step 6: Run Backend Server
```bash
python run.py
```

✅ **Backend should now be running on `http://localhost:5000`**

---

### Part 2: Frontend Setup

#### Step 1: Open a New Terminal Window
(Keep the backend running in the first terminal)

#### Step 2: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 3: Install Node Dependencies
```bash
npm install
```

#### Step 4: Run Frontend Development Server
```bash
npm start
```

✅ **Frontend should now be running on `http://localhost:3000`**

The browser should automatically open. If not, manually navigate to `http://localhost:3000`

---

## Quick Start Commands Summary

### Backend (Terminal 1):
```bash
cd backend
venv\Scripts\activate          # Windows
# or source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
# Create .env file with database credentials
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
python run.py
```

### Frontend (Terminal 2):
```bash
cd frontend
npm install
npm start
```

---

## Verifying the Setup

1. **Backend is running if you see:**
   ```
   * Running on http://0.0.0.0:5000
   * Debug mode: on
   ```

2. **Frontend is running if:**
   - Browser opens automatically at `http://localhost:3000`
   - You see the Bus Booking System homepage

3. **Test the connection:**
   - Try registering a new user
   - Login with your credentials
   - Browse buses

---

## Troubleshooting

### Backend Issues:

**Problem: Database connection error**
- Solution: Check MySQL is running and `.env` credentials are correct
- Test connection: `mysql -u root -p` (enter your password)

**Problem: Module not found errors**
- Solution: Make sure virtual environment is activated and run `pip install -r requirements.txt` again

**Problem: Flask db commands not working**
- Solution: Make sure you're in the backend directory and virtual environment is activated

**Problem: Port 5000 already in use**
- Solution: Change port in `run.py` or stop the process using port 5000

### Frontend Issues:

**Problem: npm install fails**
- Solution: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

**Problem: Port 3000 already in use**
- Solution: React will ask to use a different port, press 'Y' to confirm

**Problem: Cannot connect to backend**
- Solution: 
  1. Verify backend is running on port 5000
  2. Check `src/api/axios.js` has correct baseURL: `http://localhost:5000/api`
  3. Check CORS is enabled in backend (should be automatic)

**Problem: CORS errors in browser console**
- Solution: Backend CORS is configured for `http://localhost:3000` and `http://localhost:5173`. If using a different port, update `backend/app/__init__.py`

---

## Creating Sample Data (Optional)

To add sample buses, you can use MySQL or create a Python script:

```python
# add_sample_buses.py
from app import create_app
from app.extensions import db
from app.models import Bus

app = create_app()
with app.app_context():
    buses = [
        Bus(name="Express Bus 1", source="New York", destination="Boston", time="08:00 AM", total_seats=40, fare=50.00),
        Bus(name="Express Bus 2", source="New York", destination="Philadelphia", time="10:00 AM", total_seats=40, fare=45.00),
        Bus(name="Luxury Bus", source="Boston", destination="New York", time="02:00 PM", total_seats=30, fare=75.00),
    ]
    for bus in buses:
        db.session.add(bus)
    db.session.commit()
    print("Sample buses added!")
```

Run: `python add_sample_buses.py`

---

## Stopping the Servers

- **Backend**: Press `Ctrl+C` in the backend terminal
- **Frontend**: Press `Ctrl+C` in the frontend terminal

---

## Production Build

### Backend:
- Set `FLASK_ENV=production` in `.env`
- Use a production WSGI server like Gunicorn

### Frontend:
```bash
cd frontend
npm run build
```
This creates an optimized build in the `build` folder.

---

## Need Help?

- Check the main `README.md` for more details
- Verify all prerequisites are installed
- Check error messages in terminal for specific issues






