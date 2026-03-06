from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from models import db, User, Car, Reservation
from dotenv import load_dotenv
import os
import logging
from datetime import timedelta
import re



# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS Configuration
cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
CORS(app, origins=cors_origins)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 10,
    'pool_recycle': 3600,
}

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)

# Rate Limiting
limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"]
)

# Logging Configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Helper functions
def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r'[A-Za-z]', password):
        return False, "Password must contain at least one letter"
    if not re.search(r'\d', password):
        return False, "Password must contain at least one number"
    return True, "Valid password"

def standardize_error(message, status_code=400):
    return make_response(jsonify({'error': message, 'status': status_code}), status_code)

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to Urban Wheels API!', 'status': 'healthy'})

@app.route('/seed-database')
def seed_database():
    try:
        # Create tables if they don't exist
        db.create_all()
        
        # Check if admin already exists
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(username="admin", email="admin@gmail.com", role="admin")
            admin.set_password("admin")
            db.session.add(admin)
            admin_created = True
        else:
            admin_created = False
        
        # Check if cars already exist
        existing_cars = Car.query.count()
        if existing_cars >= 20:
            cars_added = 0
        else:
            cars = [
                {"model": "Toyota Camry", "number_plate": "KCA-001A", "capacity": 5, "category": "Sedan", "price_per_day": 50.0, "image_url": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb"},
                {"model": "Honda CR-V", "number_plate": "KCB-002B", "capacity": 5, "category": "SUV", "price_per_day": 65.0, "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"},
                {"model": "BMW X5", "number_plate": "KCC-003C", "capacity": 7, "category": "Luxury SUV", "price_per_day": 120.0, "image_url": "https://images.unsplash.com/photo-1555215695-3004980ad54e"},
                {"model": "Mercedes-Benz E-Class", "number_plate": "KCD-004D", "capacity": 5, "category": "Luxury Sedan", "price_per_day": 110.0, "image_url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8"},
                {"model": "Ford Mustang", "number_plate": "KCE-005E", "capacity": 4, "category": "Sports", "price_per_day": 95.0, "image_url": "https://images.unsplash.com/photo-1584345604476-8ec5f5d3e0c0"},
                {"model": "Nissan Rogue", "number_plate": "KCF-006F", "capacity": 5, "category": "SUV", "price_per_day": 60.0, "image_url": "https://images.unsplash.com/photo-1609521263047-f8f205293f24"},
                {"model": "Audi A4", "number_plate": "KCG-007G", "capacity": 5, "category": "Luxury Sedan", "price_per_day": 100.0, "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"},
                {"model": "Chevrolet Tahoe", "number_plate": "KCH-008H", "capacity": 8, "category": "SUV", "price_per_day": 85.0, "image_url": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b"},
                {"model": "Tesla Model 3", "number_plate": "KCI-009I", "capacity": 5, "category": "Electric Sedan", "price_per_day": 90.0, "image_url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89"},
                {"model": "Jeep Wrangler", "number_plate": "KCJ-010J", "capacity": 5, "category": "Off-Road SUV", "price_per_day": 75.0, "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"},
                {"model": "Hyundai Tucson", "number_plate": "KCK-011K", "capacity": 5, "category": "SUV", "price_per_day": 55.0, "image_url": "https://images.unsplash.com/photo-1609521263047-f8f205293f24"},
                {"model": "Mazda CX-5", "number_plate": "KCL-012L", "capacity": 5, "category": "SUV", "price_per_day": 58.0, "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"},
                {"model": "Volkswagen Passat", "number_plate": "KCM-013M", "capacity": 5, "category": "Sedan", "price_per_day": 52.0, "image_url": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb"},
                {"model": "Lexus RX 350", "number_plate": "KCN-014N", "capacity": 5, "category": "Luxury SUV", "price_per_day": 115.0, "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"},
                {"model": "Subaru Outback", "number_plate": "KCO-015O", "capacity": 5, "category": "Wagon", "price_per_day": 62.0, "image_url": "https://images.unsplash.com/photo-1609521263047-f8f205293f24"},
                {"model": "Porsche 911", "number_plate": "KCP-016P", "capacity": 2, "category": "Sports", "price_per_day": 200.0, "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70"},
                {"model": "Range Rover Sport", "number_plate": "KCQ-017Q", "capacity": 5, "category": "Luxury SUV", "price_per_day": 150.0, "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"},
                {"model": "Kia Sportage", "number_plate": "KCR-018R", "capacity": 5, "category": "SUV", "price_per_day": 54.0, "image_url": "https://images.unsplash.com/photo-1609521263047-f8f205293f24"},
                {"model": "Volvo XC90", "number_plate": "KCS-019S", "capacity": 7, "category": "Luxury SUV", "price_per_day": 125.0, "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"},
                {"model": "Acura MDX", "number_plate": "KCT-020T", "capacity": 7, "category": "SUV", "price_per_day": 80.0, "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"}
            ]
            cars_added = 0
            for car_data in cars:
                if not Car.query.filter_by(number_plate=car_data["number_plate"]).first():
                    car = Car(**car_data)
                    db.session.add(car)
                    cars_added += 1
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'admin_created': admin_created,
            'cars_added': cars_added,
            'total_users': User.query.count(),
            'total_cars': Car.query.count(),
            'admin_credentials': {
                'username': 'admin',
                'password': 'admin',
                'email': 'admin@gmail.com'
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'service': 'Urban Wheels API'})

# All cars endpoint
class Cars(Resource):
    def get(self):
        try:
            cars = Car.query.all()
            cars_data = []
            for car in cars:
                reservation = Reservation.query.filter_by(car_id=car.id).first()
                cars_data.append({
                    "id": car.id,
                    "model": car.model,
                    "number_plate": car.number_plate,
                    "capacity": car.capacity,
                    "category": car.category,
                    "image_url": car.image_url,
                    "price_per_day": car.price_per_day,
                    "available": car.available,
                    "reserved_by": reservation.user.username if reservation else None,
                    "date_reserved": reservation.start_date if reservation else None,
                    "return_date": reservation.end_date if reservation else None,
                    "amount_paid": reservation.amount_paid if reservation else None,
                    "pickup_location": reservation.pickup_location if reservation else None,
                })
            return jsonify(cars_data)
        except Exception as e:
            logger.error(f"Error fetching cars: {str(e)}")
            return standardize_error("Failed to fetch cars", 500)

api.add_resource(Cars, '/cars')

# all reservations endpoint
class Reservations(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            reservations = Reservation.query.all()
            return jsonify([reservation.to_dict() for reservation in reservations])
        except Exception as e:
            logger.error(f"Error fetching reservations: {str(e)}")
            return standardize_error("Failed to fetch reservations", 500)

api.add_resource(Reservations, '/reservations')

# all users count endpoint
class UsersCount(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            users_count = User.query.count()
            return jsonify({'users_count': users_count})
        except Exception as e:
            logger.error(f"Error fetching users count: {str(e)}")
            return standardize_error("Failed to fetch users count", 500)

api.add_resource(UsersCount, '/users/count')

# all cars count endpoint
class CarsCount(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            cars_count = Car.query.count()
            return jsonify({'cars_count': cars_count})
        except Exception as e:
            logger.error(f"Error fetching cars count: {str(e)}")
            return standardize_error("Failed to fetch cars count", 500)

api.add_resource(CarsCount, '/cars/count')

# all reservations count endpoint
class ReservationsCount(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            reservations_count = Reservation.query.count()
            return jsonify({'reservations_count': reservations_count})
        except Exception as e:
            logger.error(f"Error fetching reservations count: {str(e)}")
            return standardize_error("Failed to fetch reservations count", 500)

api.add_resource(ReservationsCount, '/reservations/count')

# adds a reservation endpoint
class AddReservation(Resource):
    @jwt_required()
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return standardize_error("No data provided", 400)
            
            # Validate required fields
            required_fields = ['user_id', 'car_id', 'start_date', 'end_date', 'amount_paid']
            for field in required_fields:
                if field not in data:
                    return standardize_error(f"Missing required field: {field}", 400)
            
            new_reservation = Reservation(
                user_id=data['user_id'],
                car_id=data['car_id'],
                start_date=data['start_date'],
                end_date=data['end_date'],
                amount_paid=data['amount_paid'],
                pickup_location=data.get('pickup_location', ''),
                status=data.get('status', 'pending')
            )
            db.session.add(new_reservation)
            db.session.commit()
            return make_response(jsonify(new_reservation.to_dict()), 201)
        except Exception as e:
            logger.error(f"Error adding reservation: {str(e)}")
            db.session.rollback()
            return standardize_error("Failed to create reservation", 500)

api.add_resource(AddReservation, '/reservations/add')

# adds car endpoint
class AddCar(Resource):
    @jwt_required()
    def post(self):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            data = request.get_json()
            if not data:
                return standardize_error("No data provided", 400)
            
            # Validate required fields
            required_fields = ['model', 'number_plate', 'capacity', 'category', 'price_per_day']
            for field in required_fields:
                if field not in data:
                    return standardize_error(f"Missing required field: {field}", 400)
            
            new_car = Car(
                model=data['model'],
                number_plate=data['number_plate'],
                capacity=data['capacity'],
                category=data['category'],
                image_url=data.get('image_url'),
                price_per_day=data['price_per_day'],
                available=data.get('available', True)
            )
            db.session.add(new_car)
            db.session.commit()
            return make_response(jsonify(new_car.to_dict()), 201)
        except Exception as e:
            logger.error(f"Error adding car: {str(e)}")
            db.session.rollback()
            return standardize_error("Failed to create car", 500)

api.add_resource(AddCar, '/cars/add')

# updates car endpoint
class UpdateCar(Resource):
    @jwt_required()
    def put(self, car_id):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            car = Car.query.get_or_404(car_id)
            data = request.get_json()
            
            car.model = data.get('model', car.model)
            car.number_plate = data.get('number_plate', car.number_plate)
            car.capacity = data.get('capacity', car.capacity)
            car.category = data.get('category', car.category)
            car.image_url = data.get('image_url', car.image_url)
            car.price_per_day = data.get('price_per_day', car.price_per_day)
            car.available = data.get('available', car.available)
            
            db.session.commit()
            return make_response(jsonify(car.to_dict()), 200)
        except Exception as e:
            logger.error(f"Error updating car: {str(e)}")
            db.session.rollback()
            return standardize_error("Failed to update car", 500)

api.add_resource(UpdateCar, '/cars/update/<int:car_id>')

# updates reservation status endpoint
class UpdateReservationStatus(Resource):
    @jwt_required()
    def put(self, reservation_id):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            reservation = Reservation.query.get_or_404(reservation_id)
            data = request.get_json()
            
            reservation.status = data.get('status', reservation.status)
            db.session.commit()
            return make_response(jsonify(reservation.to_dict()), 200)
        except Exception as e:
            logger.error(f"Error updating reservation: {str(e)}")
            db.session.rollback()
            return standardize_error("Failed to update reservation", 500)

api.add_resource(UpdateReservationStatus, '/reservations/update/<int:reservation_id>')

# deletes car endpoint
class DeleteCar(Resource):
    @jwt_required()
    def delete(self, car_id):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            car = Car.query.get_or_404(car_id)
            db.session.delete(car)
            db.session.commit()
            return make_response(jsonify({'message': 'Car deleted successfully'}), 200)
        except Exception as e:
            logger.error(f"Error deleting car: {str(e)}")
            db.session.rollback()
            return standardize_error("Failed to delete car", 500)

api.add_resource(DeleteCar, '/cars/delete/<int:car_id>')

# all users endpoint
class Users(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if user.role != 'admin':
                return standardize_error("Admin access required", 403)
            
            users = User.query.all()
            return jsonify([user.to_dict() for user in users])
        except Exception as e:
            logger.error(f"Error fetching users: {str(e)}")
            return standardize_error("Failed to fetch users", 500)

api.add_resource(Users, '/users')

# available cars endpoint
class AvailableCars(Resource):
    def get(self):
        try:
            cars = Car.query.filter_by(available=True).all()
            return jsonify([car.to_dict() for car in cars])
        except Exception as e:
            logger.error(f"Error fetching available cars: {str(e)}")
            return standardize_error("Failed to fetch available cars", 500)

api.add_resource(AvailableCars, '/cars/available')

# user registration endpoint
class Register(Resource):
    @limiter.limit("5 per minute")
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return standardize_error("No data provided", 400)
            
            # Validate required fields
            required_fields = ['username', 'email', 'password']
            for field in required_fields:
                if field not in data:
                    return standardize_error(f"Missing required field: {field}", 400)
            
            # Validate email
            if not validate_email(data['email']):
                return standardize_error("Invalid email format", 400)
            
            # Validate password
            is_valid, message = validate_password(data['password'])
            if not is_valid:
                return standardize_error(message, 400)
            
            # Check if user exists
            if User.query.filter_by(username=data['username']).first():
                return standardize_error('Username already exists', 400)
            
            if User.query.filter_by(email=data['email']).first():
                return standardize_error('Email already exists', 400)
            
            new_user = User(
                username=data['username'],
                email=data['email']
            )
            new_user.set_password(data['password'])
            db.session.add(new_user)
            db.session.commit()
            
            access_token = create_access_token(identity=new_user.id)
            return make_response(jsonify({
                'message': 'User registered successfully', 
                'access_token': access_token,
                'user': {
                    'id': new_user.id,
                    'username': new_user.username,
                    'email': new_user.email,
                    'role': new_user.role
                }
            }), 201)
        except Exception as e:
            logger.error(f"Error registering user: {str(e)}")
            db.session.rollback()
            return standardize_error("Registration failed", 500)

api.add_resource(Register, '/register')

# user login endpoint
class Login(Resource):
    @limiter.limit("10 per minute")
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return standardize_error("No data provided", 400)
            
            # Validate required fields
            if 'username' not in data or 'password' not in data:
                return standardize_error("Username and password required", 400)
            
            user = User.query.filter_by(username=data['username']).first()
            if user and user.check_password(data['password']):
                access_token = create_access_token(identity=user.id)
                return make_response(jsonify({
                    'message': 'Login successful', 
                    'access_token': access_token,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'role': user.role
                    }
                }), 200)
            return standardize_error('Invalid credentials', 401)
        except Exception as e:
            logger.error(f"Error during login: {str(e)}")
            return standardize_error("Login failed", 500)

api.add_resource(Login, '/login')

if __name__ == '__main__':
    debug_mode = os.getenv('DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=int(os.getenv('PORT', 5000)))