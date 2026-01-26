# Bus Booking System - Backend

A Flask-based REST API for bus booking system with JWT authentication.

## Features

- User authentication (Register/Login) with JWT tokens
- Bus management (CRUD operations for admins)
- Booking system with seat availability tracking
- MySQL database integration
- CORS enabled for frontend integration

## Prerequisites

- Python 3.8+
- MySQL Server
- pip

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the backend directory:
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

5. Create the database:
```sql
CREATE DATABASE busdb;
```

6. Initialize the database:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

## Running the Server

```bash
python run.py
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login and get JWT token

### Buses
- `GET /api/buses` - Get all buses with available seats
- `GET /api/bus/<id>` - Get bus details
- `POST /api/admin/buses` - Create a new bus (Admin only)

### Bookings
- `POST /api/book` - Create a booking (Requires authentication)
- `GET /api/mybookings` - Get user's bookings (Requires authentication)
- `GET /api/admin/bookings` - Get all bookings (Admin only)

## Database Models

- **User**: id, name, email, password_hash, role, created_at
- **Bus**: id, name, source, destination, time, total_seats, fare, created_at
- **Booking**: id, user_id, bus_id, seats, booking_time, status

## Notes

- Default user role is "passenger"
- To create an admin user, update the role in the database manually
- JWT tokens expire after 24 hours (default)
- All booking endpoints require authentication







