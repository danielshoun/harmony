from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import Server, db, Channel, User
from app.forms import NewServerForm
from app.models.server import memberships

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
@login_required
def get_all_servers():
    servers = Server.query.all()
    return jsonify([server.to_dict() for server in servers])


@server_routes.route('/member')
@login_required
def get_member_server():
    servers = Server.query.join(memberships).filter(
        memberships.columns.user_id == 1)

    return jsonify([server.to_dict() for server in servers])


@server_routes.route('/', methods=['POST'])
@login_required
def create_server():
    data = request.json
    server = Server(
        name=data['name'],
        picture_url=data['picture_url'],
        owner_id=current_user.id,
        invite_url=''
    )
    server.members.append(User.query.get(current_user.id))
    db.session.add(server)
    db.session.commit()
    server.invite_url = str(server.id)
    default_channel = Channel(
        name='general',
        server_id=server.id
    )
    db.session.add(default_channel)
    db.session.commit()
    return server.to_dict()
    # form = NewServerForm()
    # if form.validate_on_submit():
    #     server = Server(
    #         name=form.data.name,
    #         picture_url=form.data.picture_url,
    #         owner_id=current_user.id,
    #         invite_url=str(last_server.id + 1)
    #     )


@server_routes.route('/<int:id>')
@login_required
def get_server(id):
    return Server.query.get(id).to_dict()




@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    server = Server.query.get(id)
    if server.owner_id != current_user.id:
        return {'errors': 'Unauthorized'}
    db.session.delete(server)
    db.session.commit()
    return {'message': 'Deleted!'}


@server_routes.route('/<int:id>/join', methods=['POST'])
@login_required
def join_server(id):
    server = Server.query.get(id)
    server.members.append(User.query.get(current_user.id))
    # server.members.append(User.query.get(1))
    db.session.add(server)
    db.session.commit()
    return server.to_dict()


@server_routes.route('/<int:id>/leave', methods=['DELETE'])
@login_required
def leave_server(id):
    server = Server.query.get(id)
    server.members.append(User.query.get(current_user.id))
    # server.members.remove(User.query.get(1))
    db.session.add(server)
    db.session.commit()
    return server.to_dict()