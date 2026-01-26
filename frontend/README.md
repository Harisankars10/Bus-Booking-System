# Bus Booking System - Frontend

A React-based frontend application for the bus booking system.

## Features

- User registration and login
- Browse available buses with search functionality
- Book bus tickets
- View booking history
- Modern, responsive UI
- Protected routes with authentication

## Prerequisites

- Node.js 14+ and npm

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will run on `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js          # API configuration
│   ├── components/
│   │   └── Navbar.js         # Navigation component
│   ├── pages/
│   │   ├── Home.js           # Home page
│   │   ├── Login.js          # Login page
│   │   ├── Register.js       # Registration page
│   │   ├── Buslist.js        # Bus listing page
│   │   ├── Booking.js        # Booking page
│   │   └── MyBookings.js     # User bookings page
│   ├── styles/
│   │   └── global.css        # Global styles
│   ├── App.js                # Main app component
│   └── index.js              # Entry point
└── package.json
```

## Configuration

Update the API base URL in `src/api/axios.js` if your backend runs on a different port:

```javascript
const api = axios.create({ 
  baseURL: "http://localhost:5000/api",
  // ...
});
```

## Features Overview

- **Home Page**: Welcome page with features overview
- **Login/Register**: User authentication
- **Bus List**: Browse and search buses by source/destination
- **Booking**: Book tickets with seat selection
- **My Bookings**: View booking history

## Notes

- Make sure the backend server is running before starting the frontend
- JWT tokens are stored in localStorage
- Users are automatically redirected to login if not authenticated







