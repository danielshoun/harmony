from .db import db


class Conversation(db.Model):
    __tablename__ = 'conversations'
    id = db.Column(db.Integer, primary_key=True)
    user_1_id = db.Column('user_1_id', db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_2_id = db.Column('user_2_id', db.Integer, db.ForeignKey('users.id'), nullable=False)

    messages = db.relationship('PrivateMessage', back_populates='conversation')
    user_1 = db.relationship('User', foreign_keys=[user_1_id])
    user_2 = db.relationship('User', foreign_keys=[user_2_id])

    def to_dict(self):
        return {
            "id": self.id,
            "user_1": self.user_1.to_dict(),
            "user_2": self.user_2.to_dict(),
            "messages": [message.to_dict() for message in self.messages],
        }
