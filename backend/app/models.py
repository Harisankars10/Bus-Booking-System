from .extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(256), nullable=False, unique=True, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default="passenger")  # passenger/admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Bus(db.Model):
    __tablename__ = "buses"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    source = db.Column(db.String(128), nullable=False)
    destination = db.Column(db.String(128), nullable=False)
    time = db.Column(db.String(64), nullable=False)
    total_seats = db.Column(db.Integer, nullable=False, default=40)
    # price per seat
    fare = db.Column(db.Numeric(10,2), nullable=False, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Booking(db.Model):
    __tablename__ = "bookings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey("buses.id"), nullable=False)
    seats = db.Column(db.Integer, nullable=False)
    travel_date = db.Column(db.String(20), nullable=True)  # Storing as YYYY-MM-DD string
    booking_time = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(30), default="booked")

    user = db.relationship("User", backref="bookings")
    bus = db.relationship("Bus", backref="bookings")
