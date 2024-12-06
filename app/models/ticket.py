from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Ticket(db.Model):
    __tablename__ = 'tickets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000))
    priority = db.Column(db.Integer)
    status = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    creator = db.relationship("User", back_populates="tickets")
    project = db.relationship("Project", back_populates="tickets")


    def convert_priority(self):
        priorities = ['low,white','medium,grey','high,yellow','urgent,orange','critical,red']
        return priorities[self.priority].split(',')

    def convert_status(self):
        statuses = ['completed', 'active', 'archived']
        return statuses[self.status]


    def to_dict(self):
        """
            Returns all ticket details as a dictionary
        """
        return {
            'id': self.id,
            'creator': self.creator,
            'project': self.project,
            'name': self.name,
            'description': self.description,
            'priority': self.convert_priority(),
            'status': self.convert_status(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }