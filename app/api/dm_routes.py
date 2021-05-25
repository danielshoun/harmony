from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import Server, db, Channel, User, PrivateMessage, Conversation


dm_routes = Blueprint('dms', __name__)


@dm_routes.route('/')
@login_required
def get_conversations():
    conversations = Conversation.query.filter(
        Conversation.user_1_id == current_user.id or Conversation.user_2_id == current_user.id
    ).all()
    return jsonify([conversation.to_dict() for conversation in conversations])


@dm_routes.route('/<int:other_user_id>')
@login_required
def get_private_messages(other_user_id):
    messages = PrivateMessage.query.filter(
        (PrivateMessage.sender_id == current_user.id and PrivateMessage.recipient_id == other_user_id) or
        (PrivateMessage.sender_id == other_user_id and PrivateMessage.recipient_id == current_user.id))\
        .order_by(PrivateMessage.created_at).all()

    return jsonify([message.to_dict() for message in messages])