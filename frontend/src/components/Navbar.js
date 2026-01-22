import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
          🚌 Bus Booking
        </Link>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/buses" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Find Buses</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
          {user ? (
            <>
              <NavLink to="/mybookings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Bookings</NavLink>
              <div className="nav-user-wrapper">
                <span className="nav-user">Hi, {user.name}</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <Link to="/register" className="btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
