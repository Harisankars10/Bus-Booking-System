# How to Run the Backend - Step by Step

## Quick Start (If everything is set up)

1. **Open a terminal/command prompt**
2. **Navigate to backend folder:**
   ```bash
   cd "C:\Users\HARI SANKAR\OneDrive\Desktop\Bus Booking system\backend"
   ```

3. **Activate virtual environment:**
   ```bash
   venv\Scripts\activate
   ```

4. **Run the server:**
   ```bash
   python run.py
   ```

You should see: `* Running on http://0.0.0.0:5000`

---

## Full Setup (First Time)

### Step 1: Check MySQL is Running
- Open MySQL Workbench or MySQL Command Line
- Verify you can connect to MySQL

### Step 2: Create Database
In MySQL, run:
```sql
CREATE DATABASE busdb;
```

### Step 3: Set Up Python Environment

**Open PowerShell or Command Prompt in the backend folder:**

```powershell
# Navigate to backend
cd "C:\Users\HARI SANKAR\OneDrive\Desktop\Bus Booking system\backend"

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Configure .env File

**Edit the `.env` file** (it should already exist, but check it):

Make sure it has your MySQL password:
```
DATABASE_PASSWORD=your_mysql_password_here
```

If you don't have a MySQL password, leave it empty:
```
DATABASE_PASSWORD=
```

### Step 5: Initialize Database Tables

```bash
# Make sure virtual environment is activated
venv\Scripts\activate

# Initialize migrations
flask db init

# Create migration
flask db migrate -m "Initial migration"

# Apply migration
flask db upgrade
```

### Step 6: Run the Server

```bash
python run.py
```

---

## Troubleshooting

### Error: "Can't connect to MySQL server"
- **Solution:** Make sure MySQL Server is running
- Check MySQL service: Open Services (services.msc) and look for MySQL

### Error: "Access denied for user"
- **Solution:** Check your MySQL username and password in `.env` file
- Default username is `root`
- If you don't have a password, leave `DATABASE_PASSWORD=` empty

### Error: "Unknown database 'busdb'"
- **Solution:** Create the database:
  ```sql
  CREATE DATABASE busdb;
  ```

### Error: "No module named 'app'"
- **Solution:** Make sure you're in the backend directory
- Check: `cd "C:\Users\HARI SANKAR\OneDrive\Desktop\Bus Booking system\backend"`

### Error: "ModuleNotFoundError"
- **Solution:** Activate virtual environment and install dependencies:
  ```bash
  venv\Scripts\activate
  pip install -r requirements.txt
  ```

### Error: "flask: command not found"
- **Solution:** Install Flask-Migrate:
  ```bash
  pip install Flask-Migrate
  ```

### Port 5000 Already in Use
- **Solution:** Stop the process using port 5000 or change port in `run.py`

---

## Testing the Backend

Once running, test these URLs in your browser:

1. **Health check:** `http://localhost:5000/api/buses`
   - Should return JSON (empty array if no buses)

2. **Register:** `http://localhost:5000/api/register` (POST request needed)
   - Use Postman or curl to test

---

## Using the Batch File (Windows)

Double-click `start_backend.bat` in the backend folder, or run:
```bash
start_backend.bat
```

This will automatically:
- Check/create virtual environment
- Install dependencies if needed
- Create .env file if missing
- Start the server







