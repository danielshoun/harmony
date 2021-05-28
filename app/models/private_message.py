from .db import db


class PrivateMessage(db.Model):
    __tablename__ = 'private_messages'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    read = db.Column(db.Boolean, default=False)

    conversation = db.relationship('Conversation', back_populates='messages')
    sender = db.relationship('User', back_populates='dms_sent', foreign_keys=[sender_id])
    recipient = db.relationship('User', back_populates='dms_received', foreign_keys=[recipient_id])

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "sender": self.sender.to_dict(),
            "recipient": self.recipient.to_dict(),
            "created_at": self.created_at.isoformat(),
            "conversation_id": self.conversation_id,
            "read": self.read,
        }
