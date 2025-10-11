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
    for i in range(1, 19):
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

    # --- CARS ---
    car_models = [
        ("Toyota Corolla", "Sedan", 5),
        ("Honda Civic", "Sedan", 5),
        ("Mazda CX-5", "SUV", 5),
        ("Nissan X-Trail", "SUV", 7),
        ("Range Rover Evoque", "SUV", 5),
        ("Subaru Forester", "SUV", 5),
        ("BMW 3 Series", "Sedan", 5),
        ("Audi Q5", "SUV", 5),
        ("Mercedes C-Class", "Sedan", 5),
        ("Volkswagen Tiguan", "SUV", 5),
        ("Kia Sportage", "SUV", 5),
        ("Hyundai Tucson", "SUV", 5),
        ("Ford Ranger", "Pickup", 5),
        ("Toyota Hilux", "Pickup", 5),
        ("Isuzu D-Max", "Pickup", 5),
        ("Mitsubishi Outlander", "SUV", 7),
        ("Jeep Compass", "SUV", 5),
        ("Peugeot 3008", "SUV", 5),
        ("Chevrolet Trailblazer", "SUV", 7),
        ("Suzuki Swift", "Hatchback", 5),
        ("Toyota Land Cruiser", "SUV", 7),
        ("Tesla Model 3", "Sedan", 5),
        ("Ford Mustang", "Coupe", 4),
        ("Mini Cooper", "Hatchback", 4),
        ("Lexus RX", "SUV", 5),
        ("Volvo XC60", "SUV", 5),
        ("Porsche Cayenne", "SUV", 5),
        ("BMW X6", "SUV", 5),
        ("Toyota Prius", "Hybrid", 5),
        ("Nissan Leaf", "Electric", 5),
    ]

    cars = []
    for i, (model, category, capacity) in enumerate(car_models, start=1):
        car = Car(
            model=model,
            number_plate=f"KDA {1000+i}",
            capacity=capacity,
            category=category,
            image_url=f"https://source.unsplash.com/600x400/?{model.replace(' ', '%20')}",
            price_per_day=random.randint(50, 300),
            available=True
        )
        cars.append(car)

    db.session.add_all(cars)
    db.session.commit()

    # --- RESERVATIONS ---
    reservations = []
    for i in range(1, 6):  # 5 sample reservations
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

    print("✅ Database successfully seeded with 20 users (2 admins), 30 cars, and sample reservations!")
