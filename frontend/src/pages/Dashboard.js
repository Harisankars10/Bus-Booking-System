import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBuses: 0,
    totalRoutes: 0,
    totalBookings: 0,
    totalRevenue: 0, // Estimated revenue based on booked seats * fare
    occupancyRate: 0
  });
  const [routeStats, setRouteStats] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [busesRes, summaryRes] = await Promise.all([
        api.get("/buses"),
        api.get("/buses/summary")
      ]);

      const buses = busesRes.data;
      const summaries = summaryRes.data;

      // Calculate aggregate stats
      const totalBuses = buses.length;
      const totalBookings = buses.reduce((sum, bus) => sum + bus.booked_seats, 0);
      const totalCapacity = buses.reduce((sum, bus) => sum + bus.total_seats, 0);
      const totalRevenue = buses.reduce((sum, bus) => sum + (bus.booked_seats * bus.fare), 0);
      
      const occupancyRate = totalCapacity > 0 ? Math.round((totalBookings / totalCapacity) * 100) : 0;

      setStats({
        totalBuses,
        totalRoutes: summaries.length,
        totalBookings,
        totalRevenue,
        occupancyRate
      });

      setRouteStats(summaries);
      setBuses(buses);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Real-time insights into your bus network performance.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Buses</span>
            <span className="stat-icon">🚌</span>
          </div>
          <div className="stat-value">{stats.totalBuses}</div>
          <div className="stat-desc">Active in fleet</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Bookings</span>
            <span className="stat-icon">🎟️</span>
          </div>
          <div className="stat-value">{stats.totalBookings}</div>
          <div className="stat-desc">Seats booked today</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Est. Revenue</span>
            <span className="stat-icon">💰</span>
          </div>
          <div className="stat-value">₹{stats.totalRevenue.toLocaleString()}</div>
          <div className="stat-desc">Generated from bookings</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Occupancy Rate</span>
            <span className="stat-icon">📊</span>
          </div>
          <div className="stat-value">{stats.occupancyRate}%</div>
          <div className="stat-desc">Average seat utilization</div>
        </div>
      </div>

      <h2 className="section-title">Route Performance</h2>
      <div className="routes-grid">
        {routeStats.map((route, index) => (
          <div key={index} className="route-card">
            <div className="route-header">
              <span className="route-name">{route.source} → {route.destination}</span>
              <span className="route-badge">{route.bus_count} Buses</span>
            </div>
            
            <div className="progress-container">
              <div className="progress-label">
                <span>Occupancy</span>
                <span>{route.booked_seats} / {route.total_seats} seats</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(route.booked_seats / route.total_seats) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Bus Fleet</h2>
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Bus Name</th>
              <th>Route</th>
              <th>Time</th>
              <th>Fare</th>
              <th>Seats</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td className="fw-bold">{bus.name}</td>
                <td>{bus.source} → {bus.destination}</td>
                <td>{bus.time}</td>
                <td>₹{bus.fare}</td>
                <td>
                  <div className="seats-indicator">
                    <span className="booked">{bus.booked_seats}</span>
                    <span className="separator">/</span>
                    <span className="total">{bus.total_seats}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${bus.available_seats > 0 ? 'active' : 'full'}`}>
                    {bus.available_seats > 0 ? 'Available' : 'Full'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
