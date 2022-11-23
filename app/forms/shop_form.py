from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField, DecimalField
from wtforms.validators import DataRequired


class NewShop(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  image = StringField('image', validators=[DataRequired()])
  