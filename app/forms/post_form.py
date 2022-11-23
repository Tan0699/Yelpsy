from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField,FloatField
from wtforms.validators import DataRequired


class NewPost(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  image = StringField('image', validators=[DataRequired()])
  price = FloatField('price', validators=[DataRequired()])