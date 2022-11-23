from flask import Blueprint, jsonify, render_template,request, make_response
from flask_login import login_required,current_user
from app.models import Shop,db


#import models

from ..models import Shop,Post

list_routes = Blueprint('lists', __name__)


@list_routes.route('/',methods=["GET"])

def get_all_lists():
    # if current_user.is_authenticated:
        lists = List.query.all()
        tasks = Task.query.all()
        list_of_lists = []

        for lis in lists:
            task_of_tasks = []
            one_list = lis.to_dict()
            list_of_lists.append(one_list)
            for task in tasks:
                if task.list_id == lis.id:
                    task_of_tasks.append(task.to_dict())
            one_list["tasks"] = task_of_tasks
        return make_response(jsonify({"lists":list_of_lists}), 200)
    # return lists_of_lists.to_dict()

#         return make_response(jsonify({"lists":list_of_lists}), 200)


@list_routes.route('/<int:id>')
def get_one_List(id):
    lis = List.query.get(id)
    new_lis = lis.to_dict()
    print("THIS IS THE PRINT NEW_LIST--", lis)
    list_task = Task.query.filter(Task.list_id == id).all()
    new = [task.to_dict() for task in list_task]
    new_lis["tasks"] = new

    return new_lis

    # return "<h1>fugazi</h1>"

@list_routes.route("/new_list", methods=["POST"])
def new_list():
    # if current_user.is_authenticated:
        form = NewList()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            # data = form.data
            lis = List(
                name= form.data["name"],
                user_id = current_user.id)
            db.session.add(lis)
            db.session.commit()
        return make_response(lis.to_dict(), 201)
    # else: return make_response("Unauthorized", 401)

@list_routes.route("/<int:id>", methods=["DELETE"])
def del_list(id):
    # if current_user.is_authenticated:
        lis = List.query.get(id)
        list_tasks = Task.query.filter(lis.id==Task.list_id).all()
        if(not lis):
            return "<h1>No List<h1/>"
        if lis.user_id == current_user.id:
            if (not not list_tasks):
                for task in list_tasks:
                    db.session.delete(task)
            db.session.delete(lis)
            db.session.commit()
            return make_response("HELP", 200)
        else: return make_response("Unauthorized", 401)
    # return make_response("Unauthorized", 401)


@list_routes.route("/<int:id>", methods=["PUT"])
def edit_list(id):
    # if current_user.is_authenticated:
        form = NewList()
        one_list = List.query.get(id)
        if(not one_list):
            return "<h1>No List<h1/>"
        form['csrf_token'].data = request.cookies['csrf_token']
        if one_list.user_id == current_user.id:
            if form.validate_on_submit():
                # data = form.data
                one_list.name= form.data["name"]
                db.session.commit()
            return make_response(one_list.to_dict(), 200)
        else: return make_response("Unauthorized", 401)
        # return render_template('list_form.html',form=form)
    # else: return make_response("Unauthorized", 401)