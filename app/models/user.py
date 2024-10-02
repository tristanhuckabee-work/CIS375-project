from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    position = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)

    projects = db.relationship('Project', back_populates='creator', cascade='all, delete-orphan')
    project_mems = db.relationship('Project_User', back_populates='users', cascade='all, delete-orphan')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def all_details(self):
        """
            Returns all non-sensitive user details as a dictionary
        """
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'position': self.position,
            'projects': [
                *[project.min_details() for project in self.projects],
                *[project.as_user() for project in self.project_mems]
                ]
        }
    def min_details(self):
        """
            Returns minimal user details as a dictionary
        """
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name
        }
