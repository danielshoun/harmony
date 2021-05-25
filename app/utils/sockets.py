from flask import jsonify
from flask_socketio import SocketIO, join_room, leave_room, send
from flask_login import current_user
import datetime
import os

from app.models import ChannelMessage, db, Channel

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'placeholder'
    ]
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('join')
def on_join(data):
    id = data['channel_id']
    room = str(data['channel_id'])
    join_room(room)


@socketio.on('public_chat')
def channel_chat(data):
    new_message = ChannelMessage(
        sender_id=data['sender_id'],
        channel_id=data['channel_id'],
        body=data['body'],
        created_at=datetime.datetime.utcnow()
    )
    db.session.add(new_message)
    db.session.commit()

    send(new_message.to_dict(), to=str(data['channel_id']))


@socketio.on('connect')
def on_connect():
    print('connected')


@socketio.on('leave')
def on_leave(data):
    room = data['channel_id']
    leave_room(room)
    send('test leave')
