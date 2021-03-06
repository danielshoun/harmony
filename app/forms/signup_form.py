from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    email = field.data
    username = field.data
    user = User.query.filter(User.email == email).first()
    usernamecheck = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("User is already registered.")
    if usernamecheck:
        raise ValidationError("User is already registered.")



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
