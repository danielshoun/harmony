from app.models import db, User, Server, Channel
from faker import Faker
from random import randint

fake = Faker()


def seed_memberships():

    servers = Server.query.all()

    for i in range(0, len(servers)):
        for j in range(1, randint(1, 31)):
            if j != servers[i].owner_id:
                servers[i].members.append(User.query.get(j))

    db.session.commit()


def undo_memberships():
    db.session.execute('TRUNCATE memberships RESTART IDENTITY CASCADE;')
    db.session.commit()
