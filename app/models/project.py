from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    description = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    creator = db.relationship("User", back_populates="projects")
    users = db.relationship('Project_User', back_populates='projects', cascade='all, delete-orphan')
    tickets = db.relationship('Ticket', back_populates='project', cascade='all, delete-orphan')

    def all_details(self):
        """
            Returns all non-sensitive project details as a dictionary
        """
        return {
            'id': self.id,
            'name': self.name,
            'creator_id':self.creator_id,
            'description': self.description,
            'updated_at': self.updated_at,
            'users': sorted([user.as_user() for user in self.users], key=lambda el: el['first_name'])
        }
    
    def min_details(self):
        """
            Returns all minimal project details as a dictionary
        """
        return {
            'id': self.id,
            'name': self.name
        }