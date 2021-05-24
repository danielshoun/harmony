from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server


class NewServerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    picture_url = StringField('Picture URL')
