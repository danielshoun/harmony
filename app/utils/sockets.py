from flask_socketio import SocketIO, join_room, leave_room, send
import os

from app.models import ChannelMessage, db

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'placeholder'
    ]
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('join')
def on_join(data):
    room = data['channel_id']
    join_room(room)
    send('test join')


@socketio.on('chat')
def channel_chat(data):
    # print(data['message'])
    new_message = ChannelMessage(
        sender_id=data['sender_id'],
        channel_id=data['channel_id'],
        body=data['body']
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
