from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField,FloatField
from wtforms.validators import DataRequired


class NewReview(FlaskForm):
  rating = IntegerField('rating', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  image = StringField('image', validators=[DataRequired()])
  shop_id = IntegerField('shop_id')
  post_id = IntegerField('post_id')
  
  