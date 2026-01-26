import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import "./BusList.css";

// Mock data for UI enhancement since backend doesn't have these yet
const BUS_IMAGES = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80", // Interior/Bus
  "https://images.unsplash.com/photo-1621929747188-0b4b8f30266b?auto=format&fit=crop&w=600&q=80", // Modern Bus
  "https://images.unsplash.com/photo-1600180735322-54d92476d081?auto=format&fit=crop&w=600&q=80", // Blue Bus
  "https://images.unsplash.com/photo-1517034988775-68b31a542b93?auto=format&fit=crop&w=600&q=80", // Coach
  "https://images.unsplash.com/photo-1532585621371-d6527052994c?auto=format&fit=crop&w=600&q=80"  // Travel Bus
];

const AMENITIES = ["❄️ AC", "📶 WiFi", "🔋 Charging Point", "💧 Water Bottle", "🛌 Sleeper", "🎬 TV", "🆘 Emergency"];

const FRONTEND_FALLBACK_BUSES = [
  { id: 1001, name: "YBM Travels", source: "Chennai", destination: "Tirunelveli", time: "21:30", total_seats: 40, fare: 1100 },
  { id: 1002, name: "KPN Travels A/C Sleeper", source: "Chennai", destination: "Tirunelveli", time: "22:15", total_seats: 40, fare: 1200 },
  { id: 1003, name: "SRM Transports Multi-Axle", source: "Chennai", destination: "Tirunelveli", time: "23:00", total_seats: 44, fare: 1300 },
  { id: 1004, name: "Parveen Travels A/C Seater", source: "Chennai", destination: "Tirunelveli", time: "20:45", total_seats: 42, fare: 1000 },
  { id: 1005, name: "YBM", source: "Chennai", destination: "Madurai", time: "22:00", total_seats: 40, fare: 950 },
  { id: 1006, name: "KPN", source: "Chennai", destination: "Coimbatore", time: "22:30", total_seats: 40, fare: 900 },
  { id: 1007, name: "Zing Bus", source: "Chennai", destination: "Trichy", time: "20:00", total_seats: 40, fare: 800 },
  { id: 1008, name: "Parveen Travels", source: "Chennai", destination: "Vellore", time: "18:30", total_seats: 40, fare: 600 },
  { id: 1009, name: "Tirunelveli Express", source: "Tirunelveli", destination: "Chennai", time: "19:30", total_seats: 40, fare: 1050 },
  { id: 1010, name: "Trichy Fast", source: "Trichy", destination: "Thanjavur", time: "11:00", total_seats: 40, fare: 200 }
];

function BusList() {
  const location = useLocation();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize from navigation state or defaults
  const [searchSource, setSearchSource] = useState(location.state?.source || "");
  const [searchDestination, setSearchDestination] = useState(location.state?.destination || "");
  const [travelDate, setTravelDate] = useState(location.state?.date || new Date().toISOString().split('T')[0]);
  
  // Filters
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedBusType, setSelectedBusType] = useState("all");
  const [sortBy, setSortBy] = useState("price_low"); // price_low, price_high, rating
  const [departWindow, setDepartWindow] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async (params = {}) => {
    try {
      setLoading(true);
      const res = await api.get("/buses", { params });
      const baseList = res.data && res.data.length ? res.data : FRONTEND_FALLBACK_BUSES;
      const enrichedBuses = baseList.map((bus, index) => {
        const isAc = bus.fare > 600 || Math.random() > 0.5;
        const type = isAc ? "AC Seater/Sleeper" : "Non-AC Seater";
        const amenities = AMENITIES.sort(() => 0.5 - Math.random()).slice(0, isAc ? 4 : 2);
        if (isAc && !amenities.includes("❄️ AC")) amenities.unshift("❄️ AC");
        return {
          ...bus,
          image: BUS_IMAGES[index % BUS_IMAGES.length],
          rating: (3.5 + Math.random() * 1.5).toFixed(1),
          reviews: Math.floor(Math.random() * 500) + 50,
          amenities,
          type,
          duration: `${Math.floor(Math.random() * 5 + 5)}h ${Math.floor(Math.random() * 60)}m`,
        };
      });
      setBuses(enrichedBuses);
    } catch (err) {
      console.error("Error loading buses:", err);
      const enrichedFallback = FRONTEND_FALLBACK_BUSES.map((bus, index) => {
        const isAc = bus.fare > 600 || Math.random() > 0.5;
        const type = isAc ? "AC Seater/Sleeper" : "Non-AC Seater";
        const amenities = AMENITIES.sort(() => 0.5 - Math.random()).slice(0, isAc ? 4 : 2);
        if (isAc && !amenities.includes("❄️ AC")) amenities.unshift("❄️ AC");
        return {
          ...bus,
          image: BUS_IMAGES[index % BUS_IMAGES.length],
          rating: (3.5 + Math.random() * 1.5).toFixed(1),
          reviews: Math.floor(Math.random() * 500) + 50,
          amenities,
          type,
          duration: `${Math.floor(Math.random() * 5 + 5)}h ${Math.floor(Math.random() * 60)}m`,
        };
      });
      setBuses(enrichedFallback);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadBuses({});
  };

  const parseHour = (t) => {
    if (!t || typeof t !== 'string') return null;
    const m = t.match(/^(\d{1,2}):(\d{2})/);
    if (!m) return null;
    return parseInt(m[1], 10);
  };
  const inDepartWindow = (h) => {
    if (h == null) return true;
    if (departWindow === "all") return true;
    if (departWindow === "before10") return h < 10;
    if (departWindow === "between10_5") return h >= 10 && h < 17;
    if (departWindow === "between5_11") return h >= 17 && h < 23;
    if (departWindow === "after11") return h >= 23 || h < 3;
    return true;
  };
  const filteredBuses = useMemo(() => {
    return buses
      .filter((bus) => bus.fare >= priceRange[0] && bus.fare <= priceRange[1])
      .filter((bus) => {
        if (selectedBusType === "all") return true;
        const isAc = (bus.type || "").toLowerCase().includes("ac");
        return selectedBusType === "ac" ? isAc : !isAc;
      })
      .filter((bus) => inDepartWindow(parseHour(bus.time)))
      .map((bus) => {
        let score = 0;
        if (searchSource) {
          const s = bus.source.toLowerCase();
          const q = searchSource.toLowerCase();
          if (s === q) score += 3;
          else if (s.includes(q)) score += 1;
        }
        if (searchDestination) {
          const d = bus.destination.toLowerCase();
          const q = searchDestination.toLowerCase();
          if (d === q) score += 3;
          else if (d.includes(q)) score += 1;
        }
        return { ...bus, _score: score };
      })
      .sort((a, b) => {
        if (a._score !== b._score) return b._score - a._score;
        if (sortBy === "price_low") return a.fare - b.fare;
        if (sortBy === "price_high") return b.fare - a.fare;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [buses, searchSource, searchDestination, sortBy, priceRange, selectedBusType, departWindow]);

  const displayedBuses = filteredBuses.length === 0 ? buses : filteredBuses;

  const handleBook = (busData) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to book a bus");
      navigate("/login");
      return;
    }
    navigate(`/book/${busData.id}`, { state: { travelDate, bus: busData } });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Finding the best rides for you...</p>
      </div>
    );
  }

  return (
    <div className="buslist-page">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-container">
          <div className="search-inputs">
            <div className="input-group">
              <span className="icon">📍</span>
              <input
                type="text"
                placeholder="From"
                value={searchSource}
                onChange={(e) => setSearchSource(e.target.value)}
              />
            </div>
            <div className="swap-icon">⇄</div>
            <div className="input-group">
              <span className="icon">🎯</span>
              <input
                type="text"
                placeholder="To"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
              />
            </div>
            <div className="input-group">
              <span className="icon">📅</span>
              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>Search Buses</button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="route-summary-bar">
          <div className="summary-left">
            <h2>{displayedBuses.length} Buses</h2>
            <div className="active-route">
              {searchSource || "Anywhere"} <span className="arrow">→</span> {searchDestination || "Anywhere"}
            </div>
          </div>
          <div className="summary-right">
            <span className="date-tag">{travelDate}</span>
          </div>
        </div>

        <div className="filter-bar">
          <div className="filter-inline">
            <span className="filter-label">Bus Type</span>
            <div className="time-chip-row">
              <button className={`time-pill ${selectedBusType === "all" ? "active" : ""}`} onClick={() => setSelectedBusType("all")}>All</button>
              <button className={`time-pill ${selectedBusType === "ac" ? "active" : ""}`} onClick={() => setSelectedBusType("ac")}>AC</button>
              <button className={`time-pill ${selectedBusType === "non-ac" ? "active" : ""}`} onClick={() => setSelectedBusType("non-ac")}>Non-AC</button>
            </div>
          </div>

          <div className="filter-inline">
            <span className="filter-label">Price</span>
            <input 
              type="range" 
              min="0" 
              max="3000" 
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <span className="price-value">₹0 - ₹{priceRange[1]}</span>
          </div>

          <div className="filter-inline">
            <span className="filter-label">Departure</span>
            <div className="time-chip-row">
              <button className={`time-pill ${departWindow === "before10" ? "active" : ""}`} onClick={() => setDepartWindow("before10")}>Before 10 AM</button>
              <button className={`time-pill ${departWindow === "between10_5" ? "active" : ""}`} onClick={() => setDepartWindow("between10_5")}>10 AM - 5 PM</button>
              <button className={`time-pill ${departWindow === "between5_11" ? "active" : ""}`} onClick={() => setDepartWindow("between5_11")}>5 PM - 11 PM</button>
              <button className={`time-pill ${departWindow === "after11" ? "active" : ""}`} onClick={() => setDepartWindow("after11")}>After 11 PM</button>
              <button className={`time-pill ${departWindow === "all" ? "active" : ""}`} onClick={() => setDepartWindow("all")}>All</button>
            </div>
          </div>

          <div className="filter-inline">
            <span className="filter-label">Sort</span>
            <div className="sort-bar">
              <button className={`sort-pill ${sortBy === "price_low" ? "active" : ""}`} onClick={() => setSortBy("price_low")}>Price ↓</button>
              <button className={`sort-pill ${sortBy === "price_high" ? "active" : ""}`} onClick={() => setSortBy("price_high")}>Price ↑</button>
              <button className={`sort-pill ${sortBy === "rating" ? "active" : ""}`} onClick={() => setSortBy("rating")}>Ratings ↑</button>
            </div>
          </div>
        </div>

        <div className="bus-list-container">
          <div className="cities-quick">
            <div className="amenities-list" style={{ marginBottom: '0.5rem' }}>
              {[...new Set(buses.map(b => b.source))].sort().map((city, i) => (
                <span
                  key={`src-${city}-${i}`}
                  className="amenity-tag"
                  onClick={() => setSearchSource(city)}
                  style={{ cursor: 'pointer' }}
                >
                  {city}
                </span>
              ))}
            </div>
            <div className="amenities-list" style={{ marginBottom: '1rem' }}>
              {[...new Set(buses.map(b => b.destination))].sort().map((city, i) => (
                <span
                  key={`dst-${city}-${i}`}
                  className="amenity-tag"
                  onClick={() => setSearchDestination(city)}
                  style={{ cursor: 'pointer' }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          <div className="buses-wrapper">
            {displayedBuses.map((bus) => (
              <div key={bus.id} className="bus-card-modern">
                <div className="bus-image">
                  <img src={bus.image} alt={bus.name} />
                  <div className="rating-badge">
                    ★ {bus.rating}
                  </div>
                </div>
                
                <div className="bus-details">
                  <div className="bus-header">
                    <h3>{bus.name}</h3>
                    <span className="bus-category">{bus.type}</span>
                  </div>
                  
                  <div className="route-info">
                    <div className="time-loc">
                      <span className="time">{bus.time}</span>
                      <span className="loc">{bus.source}</span>
                    </div>
                    <div className="duration-line">
                      <span className="duration">{bus.duration}</span>
                      <div className="line"></div>
                    </div>
                    <div className="time-loc">
                      <span className="time">--:--</span>
                      <span className="loc">{bus.destination}</span>
                    </div>
                  </div>

                  <div className="amenities-list">
                    {bus.amenities.map((am, i) => (
                      <span key={i} className="amenity-tag">{am}</span>
                    ))}
                  </div>
                </div>

                <div className="bus-action">
                  <div className="price-tag">
                    <span className="label">Starting from</span>
                    <span className="amount">₹{bus.fare}</span>
                  </div>
                  <div className="seats-left">
                    {bus.available_seats ?? (bus.total_seats - (bus.booked_seats || 0))} Seats left
                  </div>
                  <button onClick={() => handleBook(bus)} className="book-btn">
                    Select Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusList;
