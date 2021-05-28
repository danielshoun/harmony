from app.models import db, User, Server, Channel, ChannelMessage
from faker import Faker
from random import randint
from datetime import datetime, timedelta


fake = Faker()


def seed_channel_messages():
    channel_messages = []
    channels = Channel.query.all()

    time = datetime.utcnow()
    time_change = timedelta(minutes=randint(1, 5))

    for i in range(1, len(channels)):
        for j in range(1, randint(1, 57)):
            channel_message = ChannelMessage(
                body=fake.sentence(),
                channel_id=i,
                sender_id=randint(1, 30),
                created_at=time + time_change
            )
            time_change += timedelta(minutes=randint(1, 5))
            channel_messages.append(channel_message)

        time_change = timedelta(minutes=randint(0, 5))

    db.session.add_all(channel_messages)
    db.session.commit()


def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
