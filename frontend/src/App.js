import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusList from "./pages/Buslist";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buses" element={<BusList />} />
       
        <Route path="/book/:busId" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </>
  );
}

export default App;
