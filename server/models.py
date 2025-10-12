from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='user')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # relationships
    reservation = db.relationship(
        'Reservation', backref='user', lazy=True, cascade="all, delete-orphan")
    
    # serialize rules
    serialize_rules = ('-password', '-reservation.user', '-reservation.car', '-car.reservation', '-user.reservation',)

    def __repr__(self):
        return f'<User {self.username}, {self.email}, {self.role}>'


class Car(db.Model, SerializerMixin):
    __tablename__ = 'cars'
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(100), nullable=False)
    number_plate = db.Column(db.String(20), unique=True, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    price_per_day = db.Column(db.Float, nullable=False)
    available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # relationships
    reservation = db.relationship(
        'Reservation', backref='car', lazy=True, cascade="all, delete-orphan")
    
    # serialize rules
    serialize_rules = ('-reservation.car',)

    def __repr__(self):
        return f'<Car {self.make} {self.model} ${self.price_per_day}/day>'


class Reservation(db.Model, SerializerMixin):
    __tablename__ = 'reservations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    amount_paid = db.Column(db.Float, nullable=False)
    pickup_location = db.Column(db.String(200), nullable=True)
    status = db.Column(db.String(50), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    
    # serialize rules   
    serialize_rules = ('-user.reservation', '-car.reservation', '-reservation.user', '-reservation.car',)

    def __repr__(self):
        return f'<Reservation {self.id} - User {self.user_id} - Car {self.car_id} - {self.status}>'
