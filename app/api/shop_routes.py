from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Shop,db

from app.forms.shop_form import NewShop
#import models

from ..models import Shop,Post

shop_routes = Blueprint('shops', __name__)


@shop_routes.route('/',methods=["GET"])
def get_all_shops():
    shops = Shop.query.all()
    the_shops = {"shops": [shop.to_dict() for shop in shops]}
    return make_response(the_shops, 200)

#  get shop by ID
@shop_routes.route('/<int:id>')
def get_one_shop(id):
    shop = Shop.query.get(id)
    if not shop:
        return make_response("Doesn't exist", 404)
    shop_dict = shop.to_dict()
    shop_posts = Post.query.filter(Post.shop_id == id).all()
    post_array = [post.to_dict() for post in shop_posts]
    shop_posts["posts"] = post_array

    return make_response(shop_posts, 200)
  

# post a new shop
@shop_routes.route('/new_shop', methods=['GET', 'POST'])
def new_shop():
    form = NewShop()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        shop = Shop(
            name= form.data["name"],
            user_id = current_user.id,
            description = form.data["description"],
            image = form.data["image"]
        )
        db.session.add(shop)
        db.session.commit()
    return make_response(shop.to_dict(), 201)


# Delete a shop
@shop_routes.route("/<int:id>", methods=["DELETE"])
def delete_shop(id):
    shop = Shop.query.get(id)
    if(not shop):
        return '<h1>No such Shop Exists</h1>'
    if shop.user_id == current_user.id:
        db.session.delete(shop)
        db.session.commit()
        return {
        "message": "Successfully deleted",
        "statusCode": 200
        }

#edit a shop
@shop_routes.route("/<int:id>", methods=["PUT"])
def edit_shop(id):
    form = NewShop()
    form['csrf_token'].data = request.cookies['csrf_token']
    one_shop = Shop.query.get(id)
    if(not one_shop):
        return "<h1>No Shop</h1>"
    if one_shop.user_id == current_user.id:
        if form.validate_on_submit():
                one_shop.name = form.data["name"]
                one_shop.image = form.data["image"]
                one_shop.description = form.data["description"]
                one_shop.posts = one_shop.posts
                one_shop.user_id = one_shop.user_id
                db.session.commit()
        return make_response(one_shop.to_dict(), 200)
    else:
        return make_response("Unauthorized", 401)


