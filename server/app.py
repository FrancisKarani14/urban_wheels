from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User, Car, Reservation


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://francis:DevKarani@localhost/urban_wheels'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)


@app.route('/')
def home():
    return "Welcome to the Flask App!"

# All cars endpoint
class CarListResource(Resource):
    def get(self):
        cars = Car.query.all()
        return jsonify([car.to_dict() for car in cars])
api.add_resource(CarListResource, '/cars')

# # Single car endpoint
# class CarResource(Resource):
#     def get(self, car_id):
#         car = Car.query.get_or_404(car_id)
#         return jsonify(car.to_dict())
# api.add_resource(CarResource, '/cars/<int:car_id>')

# all reservations endpoint
class Reservations(Resource):
    def get(self):
        reservations = Reservation.query.all()
        return jsonify([reservation.to_dict() for reservation in reservations])
api.add_resource(Reservations, '/reservations')

# all users count endpoint
class UsersCount(Resource):
    def get(self):
        users_count = User.query.count()
        return jsonify({'users_count': users_count})
api.add_resource(UsersCount, '/users/count')

# all cars count endpoint
class CarsCount(Resource):
    def get(self):
        cars_count = Car.query.count()
        return jsonify({'cars_count': cars_count})
api.add_resource(CarsCount, '/cars/count')

# all reservations count endpoint
class ReservationsCount(Resource):
    def get(self):
        reservations_count = Reservation.query.count()
        return jsonify({'reservations_count': reservations_count})
api.add_resource(ReservationsCount, '/reservations/count')

# adds a reservation endpoint
class AddReservation(Resource):
    def post(self):
        data = request.get_json()
        new_reservation = Reservation(
            user_id=data['user_id'],
            car_id=data['car_id'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            amount_paid=data['amount_paid'],
            pickup_location=data['pickup_location'],
            status=data.get('status', 'pending')
        )
        db.session.add(new_reservation)
        db.session.commit()
        return make_response(jsonify(new_reservation.to_dict()), 201)
api.add_resource(AddReservation, '/reservations/add')

# protected endpoint 

# adds car endpoint
class AddCar(Resource):
    def post(self):
        data = request.get_json()
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
api.add_resource(AddCar, '/cars/add')

# updates car endpoint
class UpdateCar(Resource):
    def put(self, car_id):
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
api.add_resource(UpdateCar, '/cars/update/<int:car_id>')

# deletes car endpoint
class DeleteCar(Resource):
    def delete(self, car_id):
        car = Car.query.get_or_404(car_id)
        db.session.delete(car)
        db.session.commit()
        return make_response(jsonify({'message': 'Car deleted successfully'}), 200)
api.add_resource(DeleteCar, '/cars/delete/<int:car_id>')





if __name__ == '__main__':
    app.run(debug=True)