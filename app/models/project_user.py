from .db import db, environment, SCHEMA, add_prefix_for_prod


class Project_User(db.Model):
    __tablename__ = 'project_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    role = db.Column(db.String, server_default='member')

    users = db.relationship('User', back_populates='project_mems')
    projects = db.relationship('Project', back_populates='users')


    def as_user(self):
        """
            Returns relationship details as a dictionary for use by the Project
        """
        return {
            'role': self.role,
            'users': [user.min_details() for user in self.users]
        }
    
    def as_project(self):
        """
            Returns relationship details as a dictionary for use by the User
        """
        return {
            'role': self.role,
            'projects': [project.min_details() for project in self.projects]
        }