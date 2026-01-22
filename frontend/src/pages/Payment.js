import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Payment.css";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  
  // Redirect if no booking data
  useEffect(() => {
    if (!state || !state.busId || !state.seats || !state.totalFare) {
      navigate("/buses");
    }
  }, [state, navigate]);

  if (!state) return null;

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        const res = await api.post("/book", {
          busId: parseInt(state.busId),
          seats: parseInt(state.seats),
          travelDate: state.travelDate
        });
        alert(`Payment Successful! Booking ID: ${res.data.booking_id}`);
        navigate("/mybookings");
      } catch (err) {
        alert(err.response?.data?.message || "Booking failed. Please try again.");
        setProcessing(false);
      }
    }, 2000);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <p className="payment-amount-label">Total Amount to Pay</p>
          <div className="payment-amount">₹{state.totalFare}</div>
        </div>

        <h3 style={{color: '#e2e8f0', marginBottom: '1rem'}}>Select Payment Method</h3>
        
        <div className="payment-methods">
          {/* UPI Option */}
          <div 
            className={`payment-method-item ${selectedMethod === 'upi' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('upi')}
          >
            <div className="radio-circle">
              <div className="radio-inner"></div>
            </div>
            <div className="method-icon">📱</div>
            <div className="method-details">
              <span className="method-name">UPI</span>
              <span className="method-desc">Google Pay, PhonePe, Paytm</span>
            </div>
          </div>

          {selectedMethod === 'upi' && (
            <div className="card-form">
              <input type="text" className="input-field" placeholder="Enter UPI ID (e.g. name@okhdfcbank)" />
              <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem'}}>
                <button className="btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.8rem', background: '#2563eb'}}>Google Pay</button>
                <button className="btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.8rem', background: '#5f259f'}}>PhonePe</button>
              </div>
            </div>
          )}

          {/* Card Option */}
          <div 
            className={`payment-method-item ${selectedMethod === 'card' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('card')}
          >
            <div className="radio-circle">
              <div className="radio-inner"></div>
            </div>
            <div className="method-icon">💳</div>
            <div className="method-details">
              <span className="method-name">Credit / Debit Card</span>
              <span className="method-desc">Visa, Mastercard, RuPay</span>
            </div>
          </div>

          {selectedMethod === 'card' && (
            <div className="card-form">
              <input type="text" className="input-field" placeholder="Card Number" maxLength="16" />
              <div className="form-row">
                <input type="text" className="input-field" placeholder="MM/YY" maxLength="5" />
                <input type="password" className="input-field" placeholder="CVV" maxLength="3" />
              </div>
              <input type="text" className="input-field" placeholder="Card Holder Name" />
            </div>
          )}

          {/* Net Banking */}
          <div 
            className={`payment-method-item ${selectedMethod === 'netbanking' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('netbanking')}
          >
            <div className="radio-circle">
              <div className="radio-inner"></div>
            </div>
            <div className="method-icon">🏦</div>
            <div className="method-details">
              <span className="method-name">Net Banking</span>
              <span className="method-desc">All major banks supported</span>
            </div>
          </div>
        </div>

        <button 
          className="pay-btn" 
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? 'Processing...' : `Pay ₹${state.totalFare}`}
        </button>
      </div>
    </div>
  );
}

export default Payment;