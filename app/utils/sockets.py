from flask import jsonify
from flask_socketio import SocketIO, join_room, leave_room, send
from flask_login import current_user
import datetime
import os

from app.models import ChannelMessage, db, Channel, PrivateMessage, Conversation

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'placeholder'
    ]
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('join')
def on_join(data):
    message_type = data["type"]
    room = None
    if message_type == 'private':
        room = str(f'conversation_{data["conversation_id"]}')
    else:
        room = str(f'channel_{data["channel_id"]}')
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

    send(new_message.to_dict(), to=f'channel_{data["channel_id"]}')

@socketio.on("private_chat")
def private_chat(data):
    if not Conversation.query.get(data["conversation_id"]):
        db.session.add(Conversation(
            user_1_id=data['sender_id'],
            user_2_id=data['recipient_id'],
        ))
        db.session.commit()

    new_message = PrivateMessage(
        sender_id=data['sender_id'],
        recipient_id=data['recipient_id'],
        conversation_id=data['conversation_id'],
        body=data['body'],
        created_at=datetime.datetime.utcnow()
    )

    db.session.add(new_message)
    db.session.commit()

    send(new_message.to_dict(), to=f'conversation_{data["conversation_id"]}')

@socketio.on('connect')
def on_connect():
    print('connected')


@socketio.on('leave')
def on_leave(data):
    type = data['type']
    room = None
    if type == 'private':
        room = str(f'conversation_{data["conversation_id"]}')
    else:
        room = str(f'channel_{data["channel_id"]}')
    leave_room(room)
    send('test leave')
