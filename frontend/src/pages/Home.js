import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

function Home() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [womenOnly, setWomenOnly] = useState(false);

  const setToday = () => setDate(new Date().toISOString().split("T")[0]);
  const setTomorrow = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    setDate(t.toISOString().split("T")[0]);
  };

  const handleSearch = () => {
    navigate("/buses", { state: { source, destination, date, womenOnly } });
  };

  return (
    <div className="container">
      <section className="home-hero">
        <div className="home-hero-banner">
          <h1 className="home-hero-title">India's No. 1 online bus ticket booking site</h1>
          <p className="home-hero-sub">Book bus tickets instantly for thousands of routes across India.</p>
        </div>

        <div className="home-search">
          <div className="home-search-fields">
            <div className="home-field">
              <span className="home-field-icon">📍</span>
              <input
                type="text"
                placeholder="From"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="home-field">
              <span className="home-field-icon">🎯</span>
              <input
                type="text"
                placeholder="To"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="home-field">
              <span className="home-field-icon">📅</span>
              <input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="home-pills">
              <button className={`pill ${date === new Date().toISOString().split("T")[0] ? "active" : ""}`} onClick={setToday}>Today</button>
              <button className="pill" onClick={setTomorrow}>Tomorrow</button>
            </div>
            <div className="home-toggle">
              <span>Booking for women</span>
              <label className="switch">
                <input type="checkbox" checked={womenOnly} onChange={(e) => setWomenOnly(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <button className="home-search-btn" onClick={handleSearch}>Search buses</button>
        </div>

        <section className="home-section">
          <div className="home-section-header">
            <h2>Offers for you</h2>
            <button className="home-section-link">View more</button>
          </div>
          <div className="offers-tabs">
            <button className="offer-tab offer-tab-active">All</button>
            <button className="offer-tab">Bus</button>
            <button className="offer-tab">Train</button>
          </div>
          <div className="offers-grid">
            <div className="offer-card offer-card-orange">
              <span className="offer-tag">Bus</span>
              <h3>Save up to ₹500 on bus tickets</h3>
              <p>Valid till 27 Jan</p>
              <div className="offer-footer">
                <span className="offer-code">BHARAT500</span>
              </div>
            </div>
            <div className="offer-card offer-card-gold">
              <span className="offer-tag">Bus</span>
              <h3>Save up to ₹300 on AP, Telangana routes</h3>
              <p>Valid till 31 Jan</p>
              <div className="offer-footer">
                <span className="offer-code">SUPERHIT</span>
              </div>
            </div>
            <div className="offer-card offer-card-peach">
              <span className="offer-tag">Bus</span>
              <h3>Save up to ₹300 on Karnataka, Tamil Nadu routes</h3>
              <p>Valid till 31 Jan</p>
              <div className="offer-footer">
                <span className="offer-code">CASH300</span>
              </div>
            </div>
            <div className="offer-card offer-card-pink">
              <span className="offer-tag">Bus</span>
              <h3>Save up to ₹500 with Axis Bank cards</h3>
              <p>Valid till 31 Jan</p>
              <div className="offer-footer">
                <span className="offer-code">AXIS500</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section-title">What&apos;s new</h2>
          <div className="whats-grid">
            <div className="whats-card whats-card-blue">
              <h3>Free Cancellation</h3>
              <p>Get 100% refund on cancellation on select bus partners.</p>
            </div>
            <div className="whats-card whats-card-red">
              <h3>Introducing Bus Timetable</h3>
              <p>Check live bus timings and schedules in your state.</p>
            </div>
            <div className="whats-card whats-card-teal">
              <h3>Flexi Ticket</h3>
              <p>Enjoy free date change and easy rescheduling options.</p>
            </div>
          </div>
        </section>

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
