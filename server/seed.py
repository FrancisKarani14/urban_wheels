from app import app
from models import db, User, Car

with app.app_context():
    # Create tables if they don't exist
    db.create_all()
    
    # Check and create admin user
    admin = User.query.filter_by(username="admin").first()
    if not admin:
        admin = User(
            username="admin",
            email="admin@gmail.com",
            role="admin"
        )
        admin.set_password("admin")
        db.session.add(admin)
        print("✅ Admin user created")
    else:
        print("ℹ️  Admin user already exists")
    
    # Check if cars already exist
    existing_cars = Car.query.count()
    if existing_cars >= 20:
        print(f"ℹ️  Database already has {existing_cars} cars. Skipping car seeding.")
    else:
        # 20 diverse cars
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
        
        for car_data in cars:
            # Check if car already exists by number plate
            existing = Car.query.filter_by(number_plate=car_data["number_plate"]).first()
            if not existing:
                car = Car(**car_data)
                db.session.add(car)
        
        print(f"✅ Added {len(cars)} cars to database")
    
    db.session.commit()
    
    print("\n" + "="*50)
    print("🎉 DATABASE SEEDING COMPLETE!")
    print("="*50)
    print("\n📊 Summary:")
    print(f"   👤 Users: {User.query.count()}")
    print(f"   🚗 Cars: {Car.query.count()}")
    print("\n🔐 Admin Credentials:")
    print("   Username: admin")
    print("   Password: admin")
    print("   Email: admin@gmail.com")
    print("="*50)
