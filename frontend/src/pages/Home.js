import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

function Home() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="container">
      <section className="hero-section">
        <h1 className="hero-title">
          Travel with Comfort & Style
        </h1>
        <p className="hero-subtitle">
          Book bus tickets instantly for thousands of routes across the country. 
          Experience seamless travel with our premium bus partners.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/buses" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Find Buses 🚌
          </Link>
          {user && (
            <Link to="/dashboard" className="btn-register" style={{ backgroundColor: '#475569', backgroundImage: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              View Dashboard 📊
            </Link>
          )}
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Fast Booking</h3>
            <p>Book your tickets in less than 2 minutes with our streamlined process.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>Safe Travel</h3>
            <p>We partner only with top-rated bus operators to ensure your safety.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💳</span>
            <h3>Best Prices</h3>
            <p>Get the most competitive fares and exclusive discounts on every booking.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;