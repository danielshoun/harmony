from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .server import memberships
from .private_message import PrivateMessage


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  servers_owned = db.relationship('Server', back_populates='owner')
  servers_joined = db.relationship('Server', secondary=memberships, back_populates='members')
  dms_sent = db.relationship('PrivateMessage', back_populates='sender', foreign_keys=[PrivateMessage.sender_id])
  dms_received = db.relationship('PrivateMessage', back_populates='recipient', foreign_keys=[PrivateMessage.recipient_id])


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
