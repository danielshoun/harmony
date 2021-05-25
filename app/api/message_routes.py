from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import Server, db, Channel, User


message_routes = Blueprint('messages', __name__)



