from app.models import db, User, Conversation, PrivateMessage
from faker import Faker
from random import randint
from datetime import datetime, timedelta

fake = Faker()


def seed_private_messages():

    conversations = Conversation.query.all()
    time = datetime.utcnow()
    time_change = timedelta(minutes=randint(1, 5))

    seed_pms = []

    for i in range(0, len(conversations)):
        convo = conversations[i]
        users = [convo.user_1_id, convo.user_2_id]
        for j in range(1, randint(1, 73)):
            sender = users[randint(0, 1)]
            reciever = users[0] if users[0] != sender else users[1]
            pm = PrivateMessage(
                body=fake.sentence(),
                sender_id=sender,
                recipient_id=reciever,
                conversation_id=convo.id,
                created_at=time - time_change
            )
            time_change += timedelta(minutes=randint(1, 5))
            seed_pms.append(pm)

        time_change = timedelta(minutes=randint(0, 5))

    db.session.add_all(seed_pms)
    db.session.commit()


def undo_private_messages():
    db.session.execute('TRUNCATE private_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
