from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def firstname_exists(form, field):
#     # Checking if username is already in use
#     firstname = field.data
#     user = User.query.filter(User.firstname == firstname).first()
#     if user:
#         raise ValidationError('firstname is already in use.')


class SignUpForm(FlaskForm):
    firstname = StringField(
        'firstname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(),Email(), user_exists])
    password = StringField('password', validators=[DataRequired()])