from flask import jsonify, request
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from flask_login import current_user
import datetime
import os

from app.models import ChannelMessage, db, Channel, PrivateMessage, Conversation

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://harmony-app-aa.herokuapp.com',
        'https://harmony-app-aa.herokuapp.com'
    ]
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)

ONLINE_USERS = {}


@socketio.on('join')
def on_join(data):
    message_type = data["type"]
    room = None
    # print('my keyword')
    # print(data["conversation_id"]
    if message_type == 'private':
        if data["conversation_id"]:
            print('my keyword')
            print(data['conversation_id'])
            room = str(f'conversation_{data["conversation_id"]}')
        else:
            print('my keyword')
            # conversation = Conversation(
            #     user_1_id=current_user.id,
            #     user_2_id=data['recipient_id'])

            # db.session.add(conversation)
            # db.session.commit()
            # room = str(f'conversation_{conversation.id}')
    else:
        room = str(f'channel_{data["channel_id"]}')
        print(room)
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


@socketio.on("public_edit")
def public_edit(data):
    message = ChannelMessage.query.get(data['id'])
    message.body = data['body']
    db.session.add(message)
    db.session.commit()

    emit("public_edit", message.to_dict(), to=f'channel_{message.channel_id}')


@socketio.on("public_delete")
def public_delete(data):
    message = ChannelMessage.query.get(data['id'])
    db.session.delete(message)
    db.session.commit()
    emit("public_delete", {'messageId': data['id']}, to=f'channel_{message.channel_id}')


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


@socketio.on("private_edit")
def public_edit(data):
    message = PrivateMessage.query.get(data['id'])
    message.body = data['body']
    db.session.add(message)
    db.session.commit()

    emit("private_edit", message.to_dict(), to=f'conversation_{data["conversation_id"]}')


@socketio.on("private_delete")
def public_delete(data):
    message = PrivateMessage.query.get(data['id'])
    db.session.delete(message)
    db.session.commit()
    emit("private_delete", {'messageId': data['id']}, to=f'conversation_{message.conversation_id}')


@socketio.on('connect')
def on_connect():
    print(f'NEW SOCKET CONNECTION, SOCKET ID: {request.sid}')


@socketio.on('login')
def login(data):
    ONLINE_USERS[request.sid] = data['user_id']
    print(f'NEW LOGIN, SOCKET ID: {request.sid}, USER ID: {ONLINE_USERS[request.sid]}')


@socketio.on('disconnect')
def on_disconnect():
    print(f'SOCKET DISCONNECTED, SOCKET ID: {request.sid}, USER ID: {ONLINE_USERS[request.sid]}')
    del ONLINE_USERS[request.sid]


@socketio.on('leave')
def on_leave(data):
    type = data['type']
    room = None
    if type == 'private':
        room = str(f'conversation_{data["conversation_id"]}')
    else:
        room = str(f'channel_{data["channel_id"]}')
    leave_room(room)
