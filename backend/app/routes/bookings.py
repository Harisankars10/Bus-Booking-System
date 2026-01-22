from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import Booking, Bus
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select, update
from datetime import datetime

bookings_bp = Blueprint("bookings", __name__)

# create booking (simple seat count booking, transactional)
@bookings_bp.route("/book", methods=["POST"])
@jwt_required()
def create_booking():
    current = get_jwt_identity()
    user_id = current.get("id")
    data = request.get_json() or {}
    bus_id = data.get("busId") or data.get("bus_id")
    seats = int(data.get("seats", 1))
    travel_date = data.get("travelDate")
    if not bus_id or seats < 1:
        return jsonify({"message":"busId and seats required"}), 400

    try:
        # Acquire a FOR UPDATE lock on bus row to safely decrement seats
        bus = db.session.execute(
            select(Bus).where(Bus.id == bus_id).with_for_update()
        ).scalar_one_or_none()

        if not bus:
            return jsonify({"message":"bus not found"}), 404

        # compute already booked seats for bus (sum of bookings with status 'booked')
        # Note: In a real system, you'd filter by travel_date too!
        # For this demo, we'll assume daily capacity reset or ignore date-based capacity for simplicity
        # unless user specifically wants date-based availability.
        # Let's keep it simple: total_seats is per trip. 
        # Ideally: filter(Booking.bus_id == bus_id, Booking.travel_date == travel_date, ...)
        
        booked_query = db.session.query(db.func.coalesce(db.func.sum(Booking.seats), 0)).filter(
            Booking.bus_id == bus_id,
            Booking.status == "booked"
        )
        
        if travel_date:
            booked_query = booked_query.filter(Booking.travel_date == travel_date)
            
        booked_sum = booked_query.scalar() or 0

        available = bus.total_seats - int(booked_sum)
        if seats > available:
            return jsonify({"message": f"only {available} seats available for this date"}), 400

        booking = Booking(
            user_id=user_id, 
            bus_id=bus_id, 
            seats=seats, 
            travel_date=travel_date,
            booking_time=datetime.utcnow(), 
            status="booked"
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify({"message":"booking confirmed", "booking_id": booking.id}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"message":"error", "detail": str(e)}), 500

# get my bookings
@bookings_bp.route("/mybookings/<int:user_id>", methods=["GET"])
def my_bookings(user_id):
    bookings = Booking.query.filter_by(user_id=user_id).all()
    out = []
    for b in bookings:
        out.append({
            "id": b.id,
            "bus_id": b.bus_id,
            "bus_name": b.bus.name if b.bus else None,
            "source": b.bus.source if b.bus else None,
            "destination": b.bus.destination if b.bus else None,
            "time": b.bus.time if b.bus else None,
            "fare": float(b.bus.fare) * b.seats if b.bus else 0,
            "seats": b.seats,
            "status": b.status,
            "travel_date": b.travel_date,
            "date": b.booking_time.isoformat()
        })
    return jsonify(out), 200

# admin - list all bookings
@bookings_bp.route("/admin/bookings", methods=["GET"])
@jwt_required()
def list_all_bookings():
    current = get_jwt_identity()
    if current.get("role") != "admin":
        return jsonify({"message":"admin only"}), 403
    bookings = Booking.query.all()
    out = []
    for b in bookings:
        out.append({
            "id": b.id,
            "user_id": b.user_id,
            "user_name": b.user.name if b.user else None,
            "bus_id": b.bus_id,
            "bus_name": b.bus.name if b.bus else None,
            "source": b.bus.source if b.bus else None,
            "destination": b.bus.destination if b.bus else None,
            "time": b.bus.time if b.bus else None,
            "fare": float(b.bus.fare) * b.seats if b.bus else 0,
            "seats": b.seats,
            "status": b.status,
            "travel_date": b.travel_date,
            "date": b.booking_time.isoformat()
        })
    return jsonify(out), 200
