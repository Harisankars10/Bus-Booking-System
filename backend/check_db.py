from app import create_app
from app.models import Bus
from app.extensions import db

app = create_app()
with app.app_context():
    buses = Bus.query.all()
    print(f"Total buses: {len(buses)}")
    for b in buses:
        print(f"Bus: {b.name}, {b.source}->{b.destination}")
