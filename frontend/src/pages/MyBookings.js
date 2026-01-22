import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/global.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    loadBookings();
  }, [navigate]);

  const loadBookings = async () => {
    try {
      const res = await api.get("/mybookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading bookings...</div></div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="no-results">
          <p>You don't have any bookings yet.</p>
          <button onClick={() => navigate("/buses")} className="btn-primary">
            Browse Buses
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card-item">
              <div className="booking-header">
                <h3>{b.bus_name}</h3>
                <span className={`status-badge ${b.status}`}>{b.status}</span>
              </div>
              <div className="booking-route">
                <span>{b.source}</span>
                <span className="route-arrow">→</span>
                <span>{b.destination}</span>
              </div>
              <div className="booking-details">
                <div className="detail-item">
                  <span className="detail-label">Seats:</span>
                  <span className="detail-value">{b.seats}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Fare:</span>
                  <span className="detail-value">₹{b.fare || (b.seats * 500)}</span> {/* Fallback fare if not in API */}
                </div>
                {b.travel_date && (
                  <div className="detail-item">
                    <span className="detail-label">Travel Date:</span>
                    <span className="detail-value" style={{color: '#60a5fa', fontWeight: 'bold'}}>{b.travel_date}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Booking Date:</span>
                  <span className="detail-value">{formatDate(b.date)}</span>
                </div>
                {b.time && (
                  <div className="detail-item">
                    <span className="detail-label">Departure Time:</span>
                    <span className="detail-value">{b.time}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
