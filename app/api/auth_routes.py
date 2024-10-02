from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user

auth_routes = Blueprint('auth', __name__)


def display_validation_errors(errors):
    res = []
    for e in errors:
        for error in errors[e]:
            res.append(f'{e} : {error}')
    return res


@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.min_details()
    
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()

        login_user(user)

        return user.min_details()
    
    return {'errors': display_validation_errors(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    logout_user()

    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )

        db.session.add(user)
        db.session.commit()

        login_user(user)

        return user.min_details()
    
    return {'errors': display_validation_errors(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401