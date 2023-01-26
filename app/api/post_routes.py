from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Post,db
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.post_form import NewPost
#import models

from ..models import Shop,Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/posts/all',methods=["GET"])
def get_all_posts():
    posts = Post.query.all()
    postt = {"posts": [post.to_dict() for post in posts]}
    return make_response(postt, 200)

#  get post by ID
@post_routes.route('/<int:shopId>/posts/<int:id>')
def get_one_post(shopId,id):
    shop = Post.query.get(id)
    if not shop:
        return make_response("Doesn't exist", 404)
    return make_response(shop.to_dict(), 200)
  

# post a new post
@post_routes.route('/<int:shopId>/posts/new_post', methods=['GET', 'POST'])
def new_post(shopId):
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
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
    post = Post(
        name= data["name"],
        user_id = current_user.id,
        description = data["description"],
        price = data["price"],
        image = url,
        shop_id=shopId
    )
    db.session.add(post)
    db.session.commit()
    return make_response(post.to_dict(), 201)


# Delete a post
@post_routes.route("/<int:shopId>/posts/<int:id>", methods=["DELETE"])
def delete_post(shopId,id):
    post = Post.query.get(id)
    if(not post):
        return '<h1>No such Post Exists</h1>'
    if post.user_id == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return {
        "message": "Successfully deleted",
        "statusCode": 200
        }

#edit a post
@post_routes.route("/<int:shopId>/posts/<int:id>", methods=["PUT"])
def edit_post(shopId,id):
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    one_post = Post.query.get(id)
    print("one------",one_post)
    if(not one_post):
        return "<h1>No Post</h1>"
    if one_post.user_id == current_user.id:
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
            one_post.name = data["name"]
            if request.files:
                one_post.image = url
            else:
                one_post.image = one_post.image
            one_post.user_id = current_user.id
            one_post.description = data["description"]
            one_post.price = data["price"]
            # shop_id=shopId
            db.session.commit()
        return make_response(one_post.to_dict(), 200)
    else:
        return make_response("Unauthorized", 401)

# search posts
@post_routes.route("/search/<query>", methods=["GET"])
def search_post(query):
    posts = Post.query.filter(Post.name.like(f"%{query}%")).all()
    post_list = {"posts": [post.to_dict() for post in posts]}
    return make_response(post_list, 200)
       
