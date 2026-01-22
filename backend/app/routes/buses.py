from flask import Blueprint, jsonify, request
from ..extensions import db
from ..models import Bus, Booking
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func

buses_bp = Blueprint("buses", __name__)

@buses_bp.route("/buses", methods=["GET"])
def list_buses():
    source = request.args.get("source", "").strip()
    destination = request.args.get("destination", "").strip()
    
    query = Bus.query
    if source:
        query = query.filter(Bus.source.ilike(f"%{source}%"))
    if destination:
        query = query.filter(Bus.destination.ilike(f"%{destination}%"))
    
    buses = query.all()
    out = []
    for b in buses:
        # Calculate available seats
        booked_seats = db.session.query(func.coalesce(func.sum(Booking.seats), 0)).filter(
            Booking.bus_id == b.id,
            Booking.status == "booked"
        ).scalar() or 0
        available_seats = b.total_seats - int(booked_seats)
        
        out.append({
            "id": b.id,
            "name": b.name,
            "source": b.source,
            "destination": b.destination,
            "time": b.time,
            "total_seats": b.total_seats,
            "available_seats": available_seats,
            "booked_seats": int(booked_seats),
            "fare": float(b.fare)
        })
    return jsonify(out), 200


# summary by source/destination
# Example: GET /api/buses/summary?source=Chennai&destination=Madurai
@buses_bp.route("/buses/summary", methods=["GET"])
def buses_summary():
    source = request.args.get("source", "").strip()
    destination = request.args.get("destination", "").strip()

    # Sum booked seats per bus (only status='booked')
    booked_subq = (
        db.session.query(
            Booking.bus_id.label("bus_id"),
            func.coalesce(func.sum(Booking.seats), 0).label("booked_seats"),
        )
        .filter(Booking.status == "booked")
        .group_by(Booking.bus_id)
        .subquery()
    )

    q = (
        db.session.query(
            Bus.source.label("source"),
            Bus.destination.label("destination"),
            func.count(Bus.id).label("bus_count"),
            func.coalesce(func.sum(Bus.total_seats), 0).label("total_seats"),
            func.coalesce(func.sum(func.coalesce(booked_subq.c.booked_seats, 0)), 0).label("booked_seats"),
        )
        .outerjoin(booked_subq, booked_subq.c.bus_id == Bus.id)
    )

    if source:
        q = q.filter(Bus.source.ilike(f"%{source}%"))
    if destination:
        q = q.filter(Bus.destination.ilike(f"%{destination}%"))

    q = q.group_by(Bus.source, Bus.destination).order_by(Bus.source.asc(), Bus.destination.asc())

    rows = q.all()
    out = []
    for r in rows:
        total_seats = int(r.total_seats or 0)
        booked_seats = int(r.booked_seats or 0)
        out.append(
            {
                "source": r.source,
                "destination": r.destination,
                "bus_count": int(r.bus_count or 0),
                "total_seats": total_seats,
                "booked_seats": booked_seats,
                "available_seats": max(total_seats - booked_seats, 0),
            }
        )
    return jsonify(out), 200

@buses_bp.route("/bus/<int:bus_id>", methods=["GET"])
def get_bus(bus_id):
    b = Bus.query.get_or_404(bus_id)
    # Calculate available seats
    booked_seats = db.session.query(func.coalesce(func.sum(Booking.seats), 0)).filter(
        Booking.bus_id == bus_id,
        Booking.status == "booked"
    ).scalar() or 0
    available_seats = b.total_seats - int(booked_seats)
    
    return jsonify({
        "id": b.id,
        "name": b.name,
        "source": b.source,
        "destination": b.destination,
        "time": b.time,
        "total_seats": b.total_seats,
        "available_seats": available_seats,
        "booked_seats": int(booked_seats),
        "fare": float(b.fare)
    }), 200

# admin-only create bus
@buses_bp.route("/admin/buses", methods=["POST"])
@jwt_required()
def create_bus():
    current = get_jwt_identity()
    if current.get("role") != "admin":
        return jsonify({"message":"admin only"}), 403

    data = request.get_json() or {}
    name = data.get("name")
    source = data.get("source")
    destination = data.get("destination")
    time = data.get("time")
    total_seats = int(data.get("total_seats", 40))
    fare = float(data.get("fare", 0.0))

    b = Bus(name=name, source=source, destination=destination, time=time, total_seats=total_seats, fare=fare)
    db.session.add(b)
    db.session.commit()
    return jsonify({"message":"bus created", "id": b.id}), 201
