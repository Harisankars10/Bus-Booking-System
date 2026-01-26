# Bus Booking System

A full-stack bus booking system with React frontend and Flask backend.

## Features

- User authentication (Register/Login)
- Browse available buses
- Search buses by source and destination
- Book bus tickets
- View booking history
- Real-time seat availability
- Modern, responsive UI
- JWT-based authentication
- MySQL database

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3

### Backend
- Flask
- SQLAlchemy
- Flask-JWT-Extended
- MySQL (PyMySQL)
- Flask-CORS

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_USER=root
DATABASE_PASSWORD=your-password
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=busdb
```

5. Create MySQL database:
```sql
CREATE DATABASE busdb;
```

6. Initialize database:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

7. Run backend server:
```bash
python run.py
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## Usage

1. Register a new account or login
2. Browse available buses on the Buses page
3. Search buses by source/destination
4. Click "Book Now" on a bus to make a booking
5. Select number of seats and confirm booking
6. View your bookings in "My Bookings" page

## Admin Features

To create an admin user:
1. Register normally
2. Update the user role in the database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

Admin users can:
- Create new buses via POST `/api/admin/buses`
- View all bookings via GET `/api/admin/bookings`

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Buses
- `GET /api/buses` - Get all buses
- `GET /api/bus/<id>` - Get bus details
- `POST /api/admin/buses` - Create bus (Admin)

### Bookings
- `POST /api/book` - Create booking (Auth required)
- `GET /api/mybookings` - Get user bookings (Auth required)
- `GET /api/admin/bookings` - Get all bookings (Admin)

## Project Structure

```
Bus Booking system/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── buses.py
│   │   │   └── bookings.py
│   │   ├── models.py
│   │   ├── config.py
│   │   └── __init__.py
│   ├── requirements.txt
│   └── run.py
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── styles/
    │   └── App.js
    └── package.json
```

## Troubleshooting

- **Database connection error**: Check MySQL is running and credentials in `.env` are correct
- **CORS errors**: Ensure backend CORS is configured for your frontend URL
- **JWT token errors**: Clear localStorage and login again
- **Port already in use**: Change ports in `run.py` (backend) or `package.json` scripts (frontend)

## License

MIT







