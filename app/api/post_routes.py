from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Post,db

from app.forms.post_form import NewPost
#import models

from ..models import Shop,Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/<int:shopId>/post',methods=["GET"])
def get_all_posts(shopId):
    posts = Post.query.all()
    postt = {"posts": [post.to_dict() for post in posts]}
    return make_response(postt, 200)

#  get post by ID
@post_routes.route('/:shopId/post/<int:id>')
def get_one_post(id):
    shop = Post.query.get(id)
    if not shop:
        return make_response("Doesn't exist", 404)
    return make_response(shop.to_dict(), 200)
  

# post a new post
@post_routes.route('/:shopId/post/new_post', methods=['GET', 'POST'])
def new_post(shopId):
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        post = Post(
            name= form.data["name"],
            user_id = current_user.id,
            description = form.data["description"],
            price = form.data["price"],
            image = form.data["image"],
            shop_id=shopId
        )
        db.session.add(post)
        db.session.commit()
    return make_response(post.to_dict(), 201)


# Delete a post
@post_routes.route("/:shopId/post/<int:id>", methods=["DELETE"])
def delete_post(id):
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
@post_routes.route("/:shopId/post/<int:id>", methods=["PUT"])
def edit_post(id):
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    one_post = Post.query.get(id)
    if(not one_post):
        return "<h1>No Post</h1>"
    if one_post.user_id == current_user.id:
        if form.validate_on_submit():
                one_post.name = form.data["name"]
                one_post.image = form.data["image"]
                one_post.user_id = current_user.id,
                one_post.description = form.data["description"],
                one_post.price = form.data["price"],
                shop_id=shopId
                db.session.commit()
        return make_response(one_post.to_dict(), 200)
    else:
        return make_response("Unauthorized", 401)


