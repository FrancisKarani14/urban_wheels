from app import app
from models import db, User
from werkzeug.security import generate_password_hash

with app.app_context():
    db.drop_all()
    db.create_all()

    # Create only one admin user
    admin = User(
        username="admin",
        email="admin@urbanwheels.com",
        password=generate_password_hash("admin123"),
        role="admin"
    )

    db.session.add(admin)
    db.session.commit()

    print("✅ Database successfully seeded!")
    print("   - 1 admin user created")
    print("   - Username: admin")
    print("   - Password: admin123")
    print("   - Email: admin@urbanwheels.com")
