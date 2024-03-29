from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Shop,db
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

from app.forms.shop_form import NewShop
#import models

from ..models import Shop,Post

shop_routes = Blueprint('shops', __name__)


@shop_routes.route('/',methods=["GET"])
def get_all_shops():
    # shops = Shop.query.all()
    # the_shops = {"shops": [shop.to_dict() for shop in shops]}
    # return make_response(the_shops, 200)
    posts = Post.query.all()
    shops = Shop.query.all()
    shop_of_shops = []

    for shop in shops:
        post_of_posts = []
        one_shop = shop.to_dict()
        shop_of_shops.append(one_shop)
        for post in posts:
            if post.shop_id == shop.id:
                    post_of_posts.append(post.to_dict())
        one_shop["posts"] = post_of_posts
    return make_response(jsonify({"shops":shop_of_shops}), 200)
#  get shop by ID
@shop_routes.route('/<int:shopId>')
def get_one_shop(shopId):
    shop = Shop.query.get(shopId)
    if not shop:
        return make_response("Doesn't exist", 404)
    shop_dict = shop.to_dict()
    shop_posts = Post.query.filter(Post.shop_id == shopId).all()
    post_array = [post.to_dict() for post in shop_posts]
    shop_dict["posts"] = post_array

    return make_response(shop_dict, 200)
  

# post a new shop
@shop_routes.route('/new_shop', methods=['POST'])
def new_shop():
    form = NewShop()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if "image" not in request.files:
            return {"errors": "image required"}, 400

        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "png,jpg,jpeg,webp files only"}, 400
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
        url = upload["url"]
        data = form.data
        shop = Shop(
            name= data["name"],
            user_id = current_user.id,
            description = data["description"],
            image = url
        )
        db.session.add(shop)
        db.session.commit()
    return make_response(shop.to_dict(), 201)


# Delete a shop
@shop_routes.route("/<int:shopId>", methods=["DELETE"])
def delete_shop(shopId):
    shop = Shop.query.get(shopId)
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
@shop_routes.route("/<int:shopId>", methods=["PUT"])
def edit_shop(shopId):
    form = NewShop()
    form['csrf_token'].data = request.cookies['csrf_token']
    one_shop = Shop.query.get(shopId)
    if(not one_shop):
        return "<h1>No Shop</h1>"
    if one_shop.user_id == current_user.id:
        if form.validate_on_submit():
            if(request.files):
                if "image" not in request.files:
                    return {"errors": "image required"}, 400

                image = request.files["image"]

                if not allowed_file(image.filename):
                    return {"errors": "png,jpg,jpeg,webp files only"}, 400
                
                image.filename = get_unique_filename(image.filename)

                upload = upload_file_to_s3(image)

                if "url" not in upload:
                    return upload, 400

                url = upload["url"]
            data = form.data
            one_shop.name = data["name"]
            if request.files:
                one_shop.image = url
            else: 
                one_shop.image = one_shop.image
            one_shop.description = data["description"]
            one_shop.posts = one_shop.posts
            one_shop.user_id = one_shop.user_id
            db.session.commit()
        return make_response(one_shop.to_dict(), 200)
    else:
        return make_response("Unauthorized", 401)


