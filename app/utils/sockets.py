from flask import request
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from flask_login import current_user
import datetime
import os
from json import dumps

from app.models import ChannelMessage, db, Channel, PrivateMessage, Conversation, User

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
            room = str(f'conversation_{data["conversation_id"]}')
    else:
        channel = Channel.query.get(data["channel_id"])
        online_user_ids = []
        offline_user_ids = []
        for user in channel.server.members:
            if user.id in ONLINE_USERS.values():
                online_user_ids.append(user.id)
            else:
                offline_user_ids.append(user.id)
        emit(
            "user_list",
            dumps({"onlineUserIds": online_user_ids, "offlineUserIds": offline_user_ids}),
            to=request.sid
        )
        room = str(f'channel_{data["channel_id"]}')
    join_room(room)


@socketio.on('join_notifications')
def join_notifications():
    room = str(f'notifications_{current_user.id}')
    join_room(room)


@socketio.on('send_notifications')
def send_notifications(data):
    recipient_id = data["recipient_id"]
    sender_id = data["sender_id"]
    conversation_id = data["conversation_id"]

    emit('receive_notifications',
         {"recipient_id": recipient_id, "sender_id": sender_id, "conversation_id": conversation_id},
         to=f'notifications_{recipient_id}')


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


@socketio.on('login')
def login(data):
    ONLINE_USERS[request.sid] = data['user_id']
    user = User.query.get(data['user_id'])
    user_channel_ids = sum([[channel.id for channel in server.channels] for server in user.servers_joined], [])
    for channel_id in user_channel_ids:
        emit("user_online", {'userId': user.id}, to=f'channel_{channel_id}')


@socketio.on('disconnect')
def on_disconnect():
    user = User.query.get(ONLINE_USERS[request.sid])
    user_channel_ids = sum([[channel.id for channel in server.channels] for server in user.servers_joined], [])
    for channel_id in user_channel_ids:
        emit("user_offline", {'userId': user.id}, to=f'channel_{channel_id}')
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


@socketio.on('join_vc')
def join_vc():
    room = str(f'video_chat_{current_user.id}')
    join_room(room)


@socketio.on('send_vc')
def send_vc(data):
    other_user = data['other_user']

    emit('receive_vc', {'call': 'join', 'user': current_user.id}, to=f'video_chat_{other_user}')

@socketio.on('send_accepted_vc')
def send_accepted_vc(data):
    other_user = data['other_user']
    print('socket route works', other_user)

    emit('accepted_vc', {'user': current_user.id}, to=f'video_chat_{other_user}')