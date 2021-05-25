from flask_socketio import SocketIO, join_room, leave_room, send
import os

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


@socketio.on('connect')
def on_connect():
    print('connected')


@socketio.on('leave')
def on_leave(data):
    room = data['channel_id']
    leave_room(room)
    send('test leave')
