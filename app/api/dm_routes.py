from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import or_, and_
from datetime import datetime

from app.models import Server, db, Channel, User, PrivateMessage, Conversation


dm_routes = Blueprint('dms', __name__)


@dm_routes.route('/')
@login_required
def get_conversations():
    conversations = Conversation.query.filter(or_(
        Conversation.user_1_id == current_user.id,
        Conversation.user_2_id == current_user.id)).all()

    return jsonify([conversation.to_dict() for conversation in conversations])


@dm_routes.route('/', methods=['POST'])
@login_required
def create_conversation():
    data = request.json
    other_user_id = data['memberId']

    conversation = Conversation.query.filter(or_(
        and_(Conversation.user_1_id == current_user.id,
             Conversation.user_2_id == other_user_id),
        and_(Conversation.user_2_id == current_user.id,
             Conversation.user_1_id == other_user_id))).all()

    # time = datetime.utcnow()

    if(len(conversation) > 0):
        # message = PrivateMessage(
        #     body=data["body"],
        #     sender_id=current_user.id,
        #     recipient_id=data["memberId"],
        #     created_at=time,
        #     conversation_id=conversation[0].id
        # )

        # db.session.add(message)
        # db.session.commit()
        return {"conversationId": conversation[0].id}

    conversation = Conversation(
        user_1_id=current_user.id,
        user_2_id=data['memberId']
    )

    db.session.add(conversation)
    db.session.commit()

    # message = PrivateMessage(
    #     body=data["body"],
    #     sender_id=current_user.id,
    #     recipient_id=data["memberId"],
    #     created_at=time,
    #     conversation_id=conversation.id
    # )

    # db.session.add(message)
    # db.session.commit()

    return {"conversationId": conversation.id}


@dm_routes.route('/new')
@login_required
def get_new_private_messages():
    new_messages = PrivateMessage.query.filter(
        and_(PrivateMessage.recipient_id == current_user.id,
             PrivateMessage.read == False)).all()

    # return jsonify(['1', '2'])
    return jsonify([new_message.to_dict() for new_message in new_messages])


@dm_routes.route('/read', methods=['PUT'])
def mark_read():
    data = request.json
    id = data['id']

    dms = PrivateMessage.query.filter(
        and_(PrivateMessage.sender_id == id,
             PrivateMessage.recipient_id == current_user.id)
    ).all()

    # print('mykeyword', dms)

    for dm in dms:
        dm.read = True

    db.session.add_all(dms)
    db.session.commit()
    return {"message": "Success!"}


@dm_routes.route('/<int:other_user_id>')
@login_required
def get_private_messages(other_user_id):
    messages = PrivateMessage.query.filter(or_(
        and_(PrivateMessage.sender_id == current_user.id,
             PrivateMessage.recipient_id == other_user_id),
        and_(PrivateMessage.sender_id == other_user_id,
             PrivateMessage.recipient_id == current_user.id)))\
        .order_by(PrivateMessage.created_at).all()

    if len(messages) == 0:
        return jsonify(['empty'])
    return jsonify([message.to_dict() for message in messages])
