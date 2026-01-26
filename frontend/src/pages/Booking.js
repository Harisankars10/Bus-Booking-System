import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import "../styles/global.css";

function Booking() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const travelDate = location.state?.travelDate || new Date().toISOString().split('T')[0];
  const initialBusFromState = location.state?.bus || null;
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    if (initialBusFromState) {
      setBus({
        available_seats: initialBusFromState.available_seats ?? (initialBusFromState.total_seats || 40),
        ...initialBusFromState
      });
      setLoading(false);
    } else {
      loadBus();
    }
  }, [busId, navigate]);

  const loadBus = async () => {
    try {
      const res = await api.get(`/bus/${busId}`);
      setBus(res.data);
    } catch (err) {
      setError("Bus not found");
    } finally {
      setLoading(false);
    }
  };

  const bookSeats = (e) => {
    e.preventDefault();
    const totalFare = bus.fare * seats;
    
    // Redirect to payment page with booking details
    navigate("/payment", { 
      state: { 
        busId: bus.id, 
        seats: seats, 
        totalFare: totalFare,
        travelDate: travelDate
      } 
    });
  };

  if (loading) {
    return (
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
        <div style={{color: '#60a5fa', fontSize: '1.2rem'}}>Loading...</div>
      </div>
    );
  }

  if (!bus) {
    return <div className="container"><div className="error-message">{error || "Bus not found"}</div></div>;
  }

  const totalFare = bus.fare * seats;

  return (
    <div className="container" style={{maxWidth: '800px'}}>
      <div className="booking-card" style={{
        background: 'rgba(30, 41, 59, 0.7)', 
        backdropFilter: 'blur(10px)', 
        padding: '2rem', 
        borderRadius: '16px', 
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h2 style={{color: '#f8fafc', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem'}}>
          Confirm Booking
        </h2>
        
        <div className="bus-info-card" style={{marginBottom: '2rem'}}>
          <h3 style={{fontSize: '1.5rem', color: '#60a5fa', marginBottom: '0.5rem'}}>{bus.name}</h3>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', marginBottom: '1.5rem', fontSize: '1.1rem'}}>
            <span>{bus.source}</span>
            <span style={{color: '#64748b'}}>→</span>
            <span>{bus.destination}</span>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
            <div>
              <span style={{display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem'}}>Date</span>
              <span style={{color: '#f1f5f9', fontWeight: '600'}}>{travelDate}</span>
            </div>
            <div>
              <span style={{display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem'}}>Departure</span>
              <span style={{color: '#f1f5f9', fontWeight: '600'}}>{bus.time}</span>
            </div>
            <div>
              <span style={{display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem'}}>Fare per Seat</span>
              <span style={{color: '#f1f5f9', fontWeight: '600'}}>₹{bus.fare}</span>
            </div>
            <div>
              <span style={{display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.25rem'}}>Available Seats</span>
              <span style={{color: '#34d399', fontWeight: '600'}}>{bus.available_seats}</span>
            </div>
          </div>
        </div>

        <form onSubmit={bookSeats} className="booking-form">
          <div className="form-group" style={{marginBottom: '2rem'}}>
            <label style={{display: 'block', color: '#e2e8f0', marginBottom: '0.5rem'}}>Number of Seats</label>
            <input
              type="number"
              min="1"
              max={bus.available_seats}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              style={{
                background: '#0f172a',
                border: '1px solid #334155',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '8px',
                width: '100%'
              }}
            />
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{color: '#94a3b8'}}>Total Amount:</span>
            <span style={{color: '#f8fafc', fontSize: '1.5rem', fontWeight: '700'}}>₹{totalFare}</span>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            style={{width: '100%', fontSize: '1.1rem', padding: '1rem'}}
          >
            Proceed to Payment 💳
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
