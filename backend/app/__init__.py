import os
from flask import Flask, render_template_string
from .config import Config
from .extensions import db, migrate, jwt, cors
from .seed import seed_sample_buses
from .routes.auth import auth_bp
from .routes.buses import buses_bp
from .routes.bookings import bookings_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"]}})

    # Create tables if they don't exist
    with app.app_context():
        db.create_all()

    # Seed sample buses (only if buses table is empty)
    with app.app_context():
        try:
            seed_sample_buses()
        except Exception:
            # If tables aren't ready yet (first run), seeding will happen after migrations.
            pass

    # Buses dashboard route
    @app.route("/buses-dashboard")
    def buses_dashboard():
        from .models import Bus, Booking
        from sqlalchemy import func
        
        # Get all buses with booking info
        buses = Bus.query.all()
        bus_data = []
        route_stats = {}
        
        for bus in buses:
            # Calculate booked seats
            booked_seats = db.session.query(func.coalesce(func.sum(Booking.seats), 0)).filter(
                Booking.bus_id == bus.id,
                Booking.status == "booked"
            ).scalar() or 0
            booked_seats = int(booked_seats)
            available_seats = bus.total_seats - booked_seats
            
            bus_data.append({
                'id': bus.id,
                'name': bus.name,
                'source': bus.source,
                'destination': bus.destination,
                'time': bus.time,
                'total_seats': bus.total_seats,
                'booked_seats': booked_seats,
                'available_seats': available_seats,
                'fare': float(bus.fare),
                'is_available': available_seats > 0
            })
            
            # Count buses per route
            route_key = f"{bus.source} → {bus.destination}"
            if route_key not in route_stats:
                route_stats[route_key] = {'count': 0, 'total_seats': 0, 'booked_seats': 0}
            route_stats[route_key]['count'] += 1
            route_stats[route_key]['total_seats'] += bus.total_seats
            route_stats[route_key]['booked_seats'] += booked_seats
        
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Buses Dashboard - Bus Booking System</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 1600px;
                    margin: 20px auto;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                }
                h1 {
                    color: #667eea;
                    border-bottom: 3px solid #667eea;
                    padding-bottom: 10px;
                }
                h2 {
                    color: #764ba2;
                    margin-top: 30px;
                }
                .stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin: 30px 0;
                }
                .stat-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                }
                .stat-number {
                    font-size: 36px;
                    font-weight: bold;
                    margin: 10px 0;
                }
                .stat-label {
                    font-size: 14px;
                    opacity: 0.9;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background: #667eea;
                    color: white;
                    font-weight: bold;
                }
                tr:hover {
                    background: #f8f9fa;
                }
                .available {
                    color: #28a745;
                    font-weight: bold;
                }
                .full {
                    color: #dc3545;
                    font-weight: bold;
                }
                .route-badge {
                    background: #e9ecef;
                    padding: 8px 15px;
                    border-radius: 20px;
                    display: inline-block;
                    margin: 5px;
                    font-weight: bold;
                }
                .back-link {
                    display: inline-block;
                    margin-bottom: 20px;
                    color: #667eea;
                    text-decoration: none;
                    padding: 10px 20px;
                    border: 2px solid #667eea;
                    border-radius: 5px;
                }
                .back-link:hover {
                    background: #667eea;
                    color: white;
                }
                .no-data {
                    text-align: center;
                    padding: 40px;
                    color: #999;
                }
                .progress-bar {
                    width: 100%;
                    height: 20px;
                    background: #e9ecef;
                    border-radius: 10px;
                    overflow: hidden;
                    margin-top: 5px;
                }
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #28a745, #20c997);
                    transition: width 0.3s;
                }
                .progress-fill.warning {
                    background: linear-gradient(90deg, #ffc107, #ff9800);
                }
                .progress-fill.danger {
                    background: linear-gradient(90deg, #dc3545, #c82333);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <a href="/" class="back-link">← Back to Home</a>
                <h1>🚌 Buses Dashboard - Availability & Statistics</h1>
                
                <div class="stats">
                    <div class="stat-card">
                        <div class="stat-label">Total Buses</div>
                        <div class="stat-number">{{ total_buses }}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Available Buses</div>
                        <div class="stat-number">{{ available_buses }}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Total Seats</div>
                        <div class="stat-number">{{ total_seats }}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Booked Seats</div>
                        <div class="stat-number">{{ booked_seats }}</div>
                    </div>
                </div>

                <h2>📍 Routes Statistics (Source → Destination)</h2>
                {% if route_stats %}
                <table>
                    <thead>
                        <tr>
                            <th>Route</th>
                            <th>Number of Buses</th>
                            <th>Total Seats</th>
                            <th>Booked Seats</th>
                            <th>Available Seats</th>
                            <th>Occupancy %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for route, stats in route_stats.items() %}
                        <tr>
                            <td><strong>{{ route }}</strong></td>
                            <td>{{ stats.count }}</td>
                            <td>{{ stats.total_seats }}</td>
                            <td>{{ stats.booked_seats }}</td>
                            <td>{{ stats.total_seats - stats.booked_seats }}</td>
                            <td>
                                {% set occupancy = (stats.booked_seats / stats.total_seats * 100) if stats.total_seats > 0 else 0 %}
                                {{ "%.1f"|format(occupancy) }}%
                                <div class="progress-bar">
                                    <div class="progress-fill {% if occupancy >= 80 %}danger{% elif occupancy >= 50 %}warning{% endif %}" 
                                         style="width: {{ occupancy }}%"></div>
                                </div>
                            </td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
                {% else %}
                <div class="no-data">
                    <p>No buses found.</p>
                </div>
                {% endif %}

                <h2>🚌 All Buses - Detailed View</h2>
                {% if bus_data %}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Bus Name</th>
                            <th>Route</th>
                            <th>Time</th>
                            <th>Total Seats</th>
                            <th>Booked Seats</th>
                            <th>Available Seats</th>
                            <th>Status</th>
                            <th>Fare</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for bus in bus_data %}
                        <tr>
                            <td>{{ bus.id }}</td>
                            <td><strong>{{ bus.name }}</strong></td>
                            <td>{{ bus.source }} → {{ bus.destination }}</td>
                            <td>{{ bus.time }}</td>
                            <td>{{ bus.total_seats }}</td>
                            <td>{{ bus.booked_seats }}</td>
                            <td>
                                {% if bus.is_available %}
                                <span class="available">{{ bus.available_seats }}</span>
                                {% else %}
                                <span class="full">0 (Full)</span>
                                {% endif %}
                            </td>
                            <td>
                                {% if bus.is_available %}
                                <span class="available">✓ Available</span>
                                {% else %}
                                <span class="full">✗ Full</span>
                                {% endif %}
                            </td>
                            <td>₹{{ "%.2f"|format(bus.fare) }}</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
                {% else %}
                <div class="no-data">
                    <p>No buses found. Add buses to see statistics.</p>
                </div>
                {% endif %}
            </div>
        </body>
        </html>
        """
        
        total_buses = len(bus_data)
        available_buses = sum(1 for b in bus_data if b['is_available'])
        total_seats = sum(b['total_seats'] for b in bus_data)
        booked_seats = sum(b['booked_seats'] for b in bus_data)
        
        return render_template_string(html, 
                                    bus_data=bus_data,
                                    route_stats=route_stats,
                                    total_buses=total_buses,
                                    available_buses=available_buses,
                                    total_seats=total_seats,
                                    booked_seats=booked_seats)

    # Admin dashboard route
    @app.route("/admin")
    def admin_dashboard():
        from .models import User, Booking
        users = User.query.order_by(User.created_at.desc()).all()
        total_users = len(users)
        total_bookings = Booking.query.count()
        
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Dashboard - Bus Booking System</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 1400px;
                    margin: 20px auto;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #667eea;
                    border-bottom: 3px solid #667eea;
                    padding-bottom: 10px;
                }
                .stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin: 30px 0;
                }
                .stat-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                }
                .stat-number {
                    font-size: 36px;
                    font-weight: bold;
                    margin: 10px 0;
                }
                .stat-label {
                    font-size: 14px;
                    opacity: 0.9;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background: #667eea;
                    color: white;
                    font-weight: bold;
                }
                tr:hover {
                    background: #f8f9fa;
                }
                .role-badge {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: bold;
                }
                .role-admin {
                    background: #ff6b6b;
                    color: white;
                }
                .role-passenger {
                    background: #4ecdc4;
                    color: white;
                }
                .back-link {
                    display: inline-block;
                    margin-bottom: 20px;
                    color: #667eea;
                    text-decoration: none;
                    padding: 10px 20px;
                    border: 2px solid #667eea;
                    border-radius: 5px;
                }
                .back-link:hover {
                    background: #667eea;
                    color: white;
                }
                .no-data {
                    text-align: center;
                    padding: 40px;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <a href="/" class="back-link">← Back to Home</a>
                <h1>👥 Admin Dashboard - Users & Activity</h1>
                
                <div class="stats">
                    <div class="stat-card">
                        <div class="stat-label">Total Registered Users</div>
                        <div class="stat-number">{{ total_users }}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Total Bookings</div>
                        <div class="stat-number">{{ total_bookings }}</div>
                    </div>
                </div>

                <h2>📋 Registered Users List</h2>
                {% if users %}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Registration Date</th>
                            <th>Total Bookings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for user in users %}
                        <tr>
                            <td>{{ user.id }}</td>
                            <td><strong>{{ user.name }}</strong></td>
                            <td>{{ user.email }}</td>
                            <td>
                                <span class="role-badge role-{{ user.role }}">
                                    {{ user.role|upper }}
                                </span>
                            </td>
                            <td>{{ user.created_at.strftime('%Y-%m-%d %H:%M:%S') }}</td>
                            <td>{{ user.bookings|length }}</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
                {% else %}
                <div class="no-data">
                    <p>No users registered yet.</p>
                </div>
                {% endif %}
            </div>
        </body>
        </html>
        """
        return render_template_string(html, users=users, total_users=total_users, total_bookings=total_bookings)

    # Home page route
    @app.route("/")
    def home():
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bus Booking System - Backend API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 1200px;
                    margin: 50px auto;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #667eea;
                    border-bottom: 3px solid #667eea;
                    padding-bottom: 10px;
                }
                .status {
                    background: #d4edda;
                    color: #155724;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #28a745;
                }
                .endpoint {
                    background: #f8f9fa;
                    padding: 15px;
                    margin: 10px 0;
                    border-left: 4px solid #667eea;
                    border-radius: 5px;
                }
                .method {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius: 3px;
                    font-weight: bold;
                    margin-right: 10px;
                }
                .get { background: #28a745; color: white; }
                .post { background: #007bff; color: white; }
                .endpoint-url {
                    font-family: monospace;
                    color: #667eea;
                    font-size: 16px;
                }
                .description {
                    color: #666;
                    margin-top: 5px;
                }
                a {
                    color: #667eea;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚌 Bus Booking System - Backend API</h1>
                
                <div class="status">
                    ✅ <strong>Backend Server is Running!</strong><br>
                    Server URL: <code>http://127.0.0.1:5000</code><br>
                    Frontend URL: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>
                </div>

                <h2>📡 Available API Endpoints</h2>

                <h3>Authentication</h3>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="endpoint-url">/api/register</span>
                    <div class="description">Register a new user. Requires: name, email, password</div>
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="endpoint-url">/api/login</span>
                    <div class="description">Login user. Returns JWT token. Requires: email, password</div>
                </div>

                <h3>Buses</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="endpoint-url"><a href="/api/buses" target="_blank">/api/buses</a></span>
                    <div class="description">Get all available buses with seat availability</div>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="endpoint-url"><a href="/api/buses/summary" target="_blank">/api/buses/summary</a></span>
                    <div class="description">Summary grouped by source &amp; destination (bus_count, total/booked/available seats)</div>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="endpoint-url">/api/bus/&lt;id&gt;</span>
                    <div class="description">Get details of a specific bus</div>
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="endpoint-url">/api/admin/buses</span>
                    <div class="description">Create a new bus (Admin only, requires JWT token)</div>
                </div>

                <h3>Bookings</h3>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="endpoint-url">/api/book</span>
                    <div class="description">Create a booking (Requires JWT token). Requires: busId, seats</div>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="endpoint-url">/api/mybookings</span>
                    <div class="description">Get user's bookings (Requires JWT token)</div>
                </div>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="endpoint-url">/api/admin/bookings</span>
                    <div class="description">Get all bookings (Admin only, requires JWT token)</div>
                </div>

                <h2>🧪 Test API</h2>
                <p>Click <a href="/api/buses" target="_blank">/api/buses</a> to see JSON response</p>
                <p>Use <a href="http://localhost:3000" target="_blank">Frontend Application</a> for full functionality</p>
                
                <h2>👥 Admin Dashboard</h2>
                <p><a href="/admin" style="font-size: 18px; font-weight: bold;">View All Registered Users →</a></p>
                
                <h2>🚌 Buses Dashboard</h2>
                <p><a href="/buses-dashboard" style="font-size: 18px; font-weight: bold;">View Buses Statistics & Availability →</a></p>
            </div>
        </body>
        </html>
        """
        return render_template_string(html)

    # register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(buses_bp, url_prefix="/api")
    app.register_blueprint(bookings_bp, url_prefix="/api")

    return app
