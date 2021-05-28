from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
from app.api.auth_routes import DEFAULT_IMAGES, S3_LOCATION
from random import choice

fake = Faker()

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(username='Demo',
                email='demo@aa.io',
                password='password',
                image_url=f'{S3_LOCATION}/{choice(DEFAULT_IMAGES)}')

    demo2 = User(username='Demo 2',
                 email='demo2@aa.io',
                 password='password',
                 image_url=f'{S3_LOCATION}/{choice(DEFAULT_IMAGES)}')

    seed_users = [demo, demo2]
    for i in range(1, 30):
        seed_users.append(User(
            username=fake.user_name(),
            email=fake.email(),
            password='password',
            image_url=f'{S3_LOCATION}/{choice(DEFAULT_IMAGES)}'
            ))

    db.session.add_all(seed_users)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
