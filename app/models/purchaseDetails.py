from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash

class PurchaseDetail(db.Model):
    __tablename__ = 'purchaseDetails'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer)
    post_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    shop_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')))
    purchase_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('purchases.id')))
    posts = db.relationship('Post', back_populates='purchasees')
    purchases = db.relationship('Purchase', back_populates='details')

    def to_dict(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "post_id": self.post_id,
            "purchase_id": self.purchase_id,
            "shop_id":self.shop_id
        }