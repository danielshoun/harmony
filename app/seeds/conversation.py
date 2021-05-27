from app.models import db, User, Conversation
from faker import Faker
from random import randint

fake = Faker()


def seed_conversations():
    users = User.query.all()

    conversations = []
    for i in range(0, 2):
        for j in range(2, randint(3, 30)):
            conversation = Conversation(
                user_1_id=users[i].id,
                user_2_id=users[j].id
            )
            conversations.append(conversation)

    db.session.add_all(conversations)
    db.session.commit()


def undo_conversations():
    db.session.execute('TRUNCATE conversations RESTART IDENTITY CASCADE;')
    db.session.commit()
