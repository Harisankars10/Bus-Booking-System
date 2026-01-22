import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🚌 Red Bus
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/buses" className="nav-link">Buses</Link>
          {user ? (
            <>
              <Link to="/mybookings" className="nav-link">My Bookings</Link>
              <span className="nav-user">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary btn-small">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
