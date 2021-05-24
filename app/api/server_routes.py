from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import Server, db, Channel
# from app.forms import NewServerForm

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
# @login_required
def get_all_servers():
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}


# @server_routes.route('/', methods=['POST'])
# @login_required
# def create_server():
#     last_server = Server.query.order_by(Server.id.desc()).first()
#     form = NewServerForm()
#     if form.validate_on_submit():
#         server = Server(
#             name=form.data.name,
#             picture_url=form.data.picture_url
#             owner_id=current_user.id
#             invite_url=str(last_server.id + 1)
#         )
#         db.session.add(server)
#         db.session.commit()

#         default_channel = Channel(
#             name='general',
#             server_id=server.id
#         )
#         db.session.add(default_channel)
#         db.session.commit()

#     return server.to_dict()
