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



if __name__ == '__main__':
    app.run(debug=True)