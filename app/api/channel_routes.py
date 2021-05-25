from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import Server, db, Channel, User
from app.forms import NewServerForm
from app.models.server import memberships

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/server/<int:server_id>')
@login_required
def get_server_channels(server_id):
    channels = Channel.query.filter(Channel.server_id == server_id).all()
    return jsonify([channel.to_dict() for channel in channels])


@channel_routes.route('/<int:channel_id>')
@login_required
def get_channel(channel_id):
    channel = Channel.query.get(channel_id)
    return channel.to_dict()


@channel_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    data = request.json
    server = Server.query.get(data['server_id'])
    if server.owner_id == current_user.id:
        channel = Channel(name=data['name'], description=data['description'], server_id=data['server_id'])
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    else:
        return {'errors': 'Unauthorized'}


@channel_routes.route('/', methods=['PUT'])
@login_required
def update_channel():
    data = request.json
    channel = Channel.query.get(data['channel_id'])
    server = Server.query.get(channel.server_id)
    if server.owner_id == current_user.id:
        channel.name = data['name'] if data['name'] else channel.name
        channel.description = data['description'] if data['description'] else channel.description
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    else:
        return {'errors': 'Unauthorized'}


@channel_routes.route('/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    data = request.json
    channel = Channel.query.get(channel_id)
    server = Server.query.get(channel.server_id)
    if server.owner_id == current_user.id:
        db.session.delete(channel)
        db.session.commit()
        return {'message': 'Deleted!'}
    else:
        return {'errors': 'Unauthorized'}
