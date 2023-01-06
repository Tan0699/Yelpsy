from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
class Purchase(db.Model):
    __tablename__ = 'purchases'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default= datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow)
    details = db.relationship('PurchaseDetail',back_populates="purchases")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "price": self.price,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "details": [detail.to_dict() for detail in self.details]
        }