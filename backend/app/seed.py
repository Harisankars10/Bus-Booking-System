from .extensions import db
from .models import Bus

def seed_sample_buses():
    if Bus.query.first():
        return

    sample_buses = [
        Bus(name="KPN Travels", source="Chennai", destination="Bangalore", time="22:00", total_seats=40, fare=850.00),
        Bus(name="SRS Travels", source="Chennai", destination="Madurai", time="21:30", total_seats=45, fare=750.00),
        Bus(name="Parveen Travels", source="Bangalore", destination="Chennai", time="23:00", total_seats=40, fare=900.00),
        Bus(name="VRL Logistics", source="Mumbai", destination="Pune", time="08:00", total_seats=35, fare=450.00),
        Bus(name="Orange Tours", source="Hyderabad", destination="Bangalore", time="20:00", total_seats=40, fare=1200.00),
        Bus(name="Jabbar Travels", source="Bangalore", destination="Hyderabad", time="21:00", total_seats=42, fare=1100.00),
        Bus(name="IntrCity SmartBus", source="Delhi", destination="Manali", time="18:00", total_seats=30, fare=1500.00),
        Bus(name="Zingbus", source="Delhi", destination="Jaipur", time="06:00", total_seats=45, fare=600.00),
        Bus(name="Morning Star", source="Vijayawada", destination="Hyderabad", time="10:00", total_seats=40, fare=550.00),
        Bus(name="Kaveri Travels", source="Chennai", destination="Coimbatore", time="22:30", total_seats=40, fare=800.00),
    ]

    for bus in sample_buses:
        db.session.add(bus)
    
    db.session.commit()
    print("Sample buses seeded successfully.")
