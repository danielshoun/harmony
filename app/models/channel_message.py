from .db import db


class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    channel = db.relationship('Channel', back_populates='messages')
    sender = db.relationship('User')

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "channel_id": self.channel_id,
            "sender": self.sender.to_dict(),
            "created_at": self.created_at
        }
