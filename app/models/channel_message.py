from .db import db


class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    channel = db.relationship('Channel', back_populates='messages')
    sender = db.relationship('User')

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "channel": self.channel.to_dict(),
            "sender": self.sender.to_dict()
        }
