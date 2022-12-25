from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Review,db
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.review_form import NewReview
#import models

from ..models import Shop,Post,Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/',methods=["GET"])
def get_all_reviews():
    reviews = Review.query.all()
    review_list = {"reviews": [review.to_dict() for review in reviews]}
    return make_response(review_list, 200)

#  get postreview by ID
# @review_routes.route('/<int:shopId>/posts/<int:id>/postrevId')
# def get_one_postrev(shopId,id,postrevId):
#     rev = Review.query.get(id)
#     if not rev:
#         return make_response("Doesn't exist", 404)
#     return make_response(rev.to_dict(), 200)
    
    #  get shopreview by ID
@review_routes.route('/<int:id>')
def get_one_shoprev(id):
    rev = Review.query.get(id)
    if not rev:
        return make_response("Doesn't exist", 404)
    return make_response(rev.to_dict(), 200)
    
  

# post a new rev
@review_routes.route('/new_review', methods=['GET', 'POST'])
def new_review():
    form = NewReview()
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
        review = Review(
            user_id = current_user.id,
            description = data["description"],
            image = url,
            if data["shop_id"]:
                post_id = data["shop_id"],
            if data["post_id"]:
                shop_id = data["post_id"],
            rating = data["rating"]
        )
        db.session.add(review)
        db.session.commit()
    return make_response(review.to_dict(), 201)


# Delete a review
@review_routes.route("/<int:id>", methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)
    if(not review):
        return '<h1>No such Review Exists</h1>'
    if review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return {
        "message": "Successfully deleted",
        "statusCode": 200
        }

#edit a post
@review_routes.route("/<int:id>", methods=["PUT"])
def edit_review(id):
    form = NewReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    one_review = Review.query.get(id)
    if(not one_review):
        return "<h1>No Review</h1>"
    if one_review.user_id == current_user.id:
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
            one_review.rating = data["rating"]
            if request.files:
                one_review.image = url
            one_review.description = data["description"]
            db.session.commit()
        return make_response(one_review.to_dict(), 200)
    else:
        return make_response("Unauthorized", 401)


