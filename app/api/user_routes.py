from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

@user_routes.route('/', methods=["PUT"])
@login_required
def updateduser():
    data = request.json
    user = User.query.get(current_user.id)

    if (user.email == "demo@aa.io" or user.email == "demo2@aa.io"):
        return {'errors': 'Cannot change Demo User credentials'}

    if len(data["username"]) == 0 or len(data["email"]) == 0:
        return {'errors': 'Please fill something in to change to!'}

    if (data["type"] == "username"):
        usernamecheck = User.query.filter_by(username=data["username"]).first()
        if (usernamecheck):
            return {'errors': 'Username has already been taken'}

    if (data["type"] == "email"):
        if (data["email"].find("@") == -1):
            return {'errors': 'Please properly format email'}
        emailcheck = User.query.filter_by(email=data["email"]).first()
        if (emailcheck):
            return {'errors': 'Email has already been taken'}

    user.email = data["email"]
    user.username = data["username"]
    user.image_url = data["image_url"]

    db.session.add(user)
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
