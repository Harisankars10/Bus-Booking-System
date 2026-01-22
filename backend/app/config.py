import os
from dotenv import load_dotenv
load_dotenv()


class Config:
    FLASK_ENV = os.getenv("FLASK_ENV", "production")
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me")

    # Use DATABASE_URL if provided, otherwise default to a local SQLite file.
    # This avoids needing MySQL installed on your machine.
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///bus.db"  # creates bus.db file in the backend folder
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
