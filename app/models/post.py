from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(20), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')))
    description = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(2000), nullable=False)
    price = db.Column(db.Float, nullable=False)

  
  
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "description": self.description,
            "image": self.image,
            "price": self.price,
            "shop_id": self.shop_id
        }
