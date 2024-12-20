from flask import Blueprint
from flask_login import login_required
from app.models import User, Project

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.all_details() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.all_details()

@user_routes.route('/<int:id>/projects')
def user_projects(id):
    """
    GET All Projects for an associated User
    """
    projects = Project.query.filter(Project.users.contains(id)).all()
    return {"projects" : [project.all_details() for project in projects]}