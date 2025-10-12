from app import app
from models import db, User, Car, Reservation
from werkzeug.security import generate_password_hash
from datetime import date, timedelta
import random

with app.app_context():
    db.drop_all()
    db.create_all()

    # --- USERS ---
    users = []
    for i in range(1, 29):  # 28 normal users
        user = User(
            username=f"user{i}",
            email=f"user{i}@gmail.com",
            password=generate_password_hash("password123"),
            role="user"
        )
        users.append(user)

    # --- ADMINS ---
    admin1 = User(
        username="admin1",
        email="admin1@urbanwheels.com",
        password=generate_password_hash("adminpass"),
        role="admin"
    )
    admin2 = User(
        username="admin2",
        email="admin2@urbanwheels.com",
        password=generate_password_hash("adminpass"),
        role="admin"
    )

    users.extend([admin1, admin2])

    db.session.add_all(users)
    db.session.commit()

    # --- LUXURY CARS ---
    luxury_cars = [
        ("Range Rover Velar", "SUV", 5),
        ("Range Rover Sport", "SUV", 5),
        ("Range Rover Vogue", "SUV", 5),
        ("Audi A8", "Sedan", 5),
        ("Audi Q7", "SUV", 7),
        ("Audi RS7", "Sportback", 4),
        ("Volkswagen Touareg", "SUV", 5),
        ("Volkswagen Arteon", "Sedan", 5),
        ("Mercedes-Benz S-Class", "Sedan", 5),
        ("Mercedes-Benz GLE", "SUV", 5),
        ("Mercedes-Benz G-Wagon", "SUV", 5),
        ("BMW X5", "SUV", 5),
        ("BMW X7", "SUV", 7),
        ("BMW 7 Series", "Sedan", 5),
        ("Porsche Cayenne", "SUV", 5),
        ("Porsche Panamera", "Sedan", 4),
        ("Bentley Bentayga", "SUV", 5),
        ("Bentley Continental GT", "Coupe", 4),
        ("Lexus LX 600", "SUV", 7),
        ("Tesla Model X", "Electric SUV", 7)
    ]

    cars = []
    for i, (model, category, capacity) in enumerate(luxury_cars, start=1):
        car = Car(
            model=model,
            number_plate=f"KDA {5000+i}",
            capacity=capacity,
            category=category,
            image_url=f"https://source.unsplash.com/600x400/?{model.replace(' ', '%20')}",
            price_per_day=random.randint(400, 1200),
            available=True
        )
        cars.append(car)

    db.session.add_all(cars)
    db.session.commit()

    # --- RESERVATIONS ---
    reservations = []
    for i in range(1, 11):  # just 10 demo reservations
        start = date.today() + timedelta(days=random.randint(1, 10))
        end = start + timedelta(days=random.randint(2, 6))
        car = random.choice(cars)
        user = random.choice(users)

        total_days = (end - start).days
        total_price = car.price_per_day * total_days

        res = Reservation(
            user_id=user.id,
            car_id=car.id,
            start_date=start,
            end_date=end,
            total_price=total_price,
            status=random.choice(["pending", "confirmed", "cancelled"])
        )
        reservations.append(res)

    db.session.add_all(reservations)
    db.session.commit()

    print("✅ Database successfully seeded with 30 users (2 admins), 20 luxury cars, and 10 sample reservations!")
