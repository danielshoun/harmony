from app.models import db, User, Server, Channel
from faker import Faker
from random import randint

fake = Faker()

# Adds a demo user, you can add other users here if you want


def seed_servers():

    seed_servers = []
    seed_channels = []
    for i in range(1, 8):
        owner_id = randint(1, 30)
        server = Server(
            name=fake.word(),
            picture_url=None,
            owner_id=owner_id,
            invite_url=str(i)
        )
        server.members.append(User.query.get(owner_id))
        default_channel = Channel(
            name='general',
            server_id=i
        )
        seed_channels.append(default_channel)

    db.session.add_all(seed_servers)
    db.session.add_all(seed_channels)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
