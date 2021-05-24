from .db import db


class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(100))
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)

    server = db.relationship('Server', back_populates='channels')
    messages = db.relationship('Message', back_populates='channel')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "server": self.server.to_dict(),
            "messages": [message.to_dict() for message in self.messages]
        }
