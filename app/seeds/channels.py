from app.models import db, User, Server, Channel
from faker import Faker
from random import randint

fake = Faker()

# Adds a demo user, you can add other users here if you want


def seed_channels():
    channels = []

    for i in range(1, 8):
        for j in range(1, randint(1, 21)):
            channel = Channel(
                name=fake.word(),
                description=fake.sentence(),
                server_id=i
            )
            channels.append(channel)

    db.session.add_all(channels)
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
