from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import Server, db, Channel, User, ChannelMessage


message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:channel_id>')
# @login_required
def get_channel_message(channel_id):
    channel = Channel.query.get(channel_id)
    server = Server.query.get(channel.server_id)

    # if server not in current_user.servers_joined:
    #     return {'errors': 'Unauthorized'}

    messages = ChannelMessage.query.filter(
        ChannelMessage.channel_id == channel_id).order_by(
            ChannelMessage.created_at).all()

    return jsonify([message.to_dict() for message in messages])
