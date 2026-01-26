# ✅ Backend Dependencies Installed!

All required packages have been installed successfully. Now follow these steps:

## Step 1: Make Sure MySQL is Running

**Start MySQL Server:**
- Open MySQL Workbench (it may start MySQL automatically)
- OR Open Services (`Win+R` → `services.msc`) → Find "MySQL80" → Start
- OR Run in Command Prompt (as Admin): `net start MySQL80`

## Step 2: Create the Database

Open MySQL Workbench or MySQL Command Line and run:
```sql
CREATE DATABASE busdb;
```

## Step 3: Update .env File

Make sure `backend\.env` file has your MySQL password:
```
DATABASE_PASSWORD=your_password
```
(Leave empty if no password: `DATABASE_PASSWORD=`)

## Step 4: Initialize Database Tables

Open a terminal in the backend folder and run:

```bash
cd "C:\Users\HARI SANKAR\OneDrive\Desktop\Bus Booking system\backend"

# Activate virtual environment (if using .venv)
.venv\Scripts\activate

# OR if using venv folder
venv\Scripts\activate

# Run migrations
flask db migrate -m "Initial migration"
flask db upgrade
```

## Step 5: Start the Backend

```bash
python run.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

## ✅ Success!

Once you see the "Running on http://0.0.0.0:5000" message, your backend is ready!

Test it by opening: `http://localhost:5000/api/buses` in your browser.
You should see `[]` (empty array) if no buses are added yet.

---

## Troubleshooting

### "Can't connect to MySQL server"
→ Start MySQL Server (see Step 1)

### "Unknown database 'busdb'"
→ Create the database (see Step 2)

### "flask: command not found"
→ Make sure virtual environment is activated

### Port 5000 already in use
→ Stop other services using port 5000 or change port in `run.py`







