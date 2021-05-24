from .db import db


class PrivateMessage(db.Model):
    __tablename__ = 'private_messages'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    sender_id = db.Column(db.Integer, nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)

    sender = db.relationship('User', back_populates='dms_sent')
    recipient = db.relationship('User', back_populates='dms_received')

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "sender": self.sender.to_dict(),
            "recipient": self.recipient.to_dict(),
        }
