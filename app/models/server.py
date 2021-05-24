from .db import db

memberships = db.Table(
    'memberships',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('server_id', db.Integer, db.ForeignKey('servers.id'), primary_key=True)
)


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    picture_url = db.Column(db.String(500))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    invite_url = db.Column(db.String(10), nullable=False)

    owner = db.relationship('User', back_populates='servers_owned')
    channels = db.relationship('Channel', cascade='all, delete-orphan', back_populates='server')
    members = db.relationship('User', secondary=memberships, back_populates='servers_joined')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "pictureUrl": self.picture_url,
            "owner": self.owner.to_dict(),
            "inviteUrl": self.invite_url,
            "channels": [channel.to_dict() for channel in self.channels]
        }
