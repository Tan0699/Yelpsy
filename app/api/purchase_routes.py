from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Post,db
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from ..models import Purchase,PurchaseDetail


purchase_routes = Blueprint('purchase',__name__)

@purchase_routes.route('/<int:userId>',methods=["GET"])
def get_user_purchases(userId):
    purchases = Purchase.query.filter(Purchase.user_id==userId).all()
    print("----------PURCHSES_----",purchases)
    purchase_list = {"purchases": [purchase.to_dict() for purchase in purchases]}
    return make_response(purchase_list, 200)

@purchase_routes.route("/new_purchase",methods=['GET','POST'])
def create_purchases():
    # this grabs the data from the request body, no need form 
    data = request.get_json()
    print("le datat ",data)
    purchase = Purchase(
        user_id = current_user.id,
        total_price = data['total_price']
    )
    print("________________totoal price",purchase.to_dict()['total_price'])
    db.session.add(purchase)
    db.session.commit()
    details = request.get_json()['details']
    print("---------YOOOYOOY----------",details)

    for post in details:
        purchased_post = PurchaseDetail(
            quantity = post['quantity'],
            post_id = post['id'],
            purchase_id = purchase.to_dict()['id'],
            )
        db.session.add(purchased_post)
    print("purchase afoisfioasjfiodsajfia     -----------------------------",purchase.to_dict())
    db.session.commit()
    return make_response({"purchase":purchase.to_dict()}, 200)

