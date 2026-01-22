from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import User
from ..utils import hash_password, verify_password
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    if not (name and email and password):
        return jsonify({"message":"name,email,password required"}), 400

    user = User(name=name, email=email, password_hash=hash_password(password))
    try:
        db.session.add(user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message":"Email already registered"}), 400

    return jsonify({"message":"registered"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    if not (email and password):
        return jsonify({"message":"email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not verify_password(password, user.password_hash):
        return jsonify({"message":"invalid credentials"}), 401

    token = create_access_token(identity={"id": user.id, "role": user.role})
    return jsonify({"message":"login successful", "access_token": token, "user":{"id":user.id,"name":user.name,"email":user.email,"role":user.role}}), 200
