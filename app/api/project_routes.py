from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Project, Project_User, Ticket, db
from app.forms import ProjectForm

project_routes = Blueprint('projects', __name__)

@project_routes.route("/", methods=["POST"])
def create_project():
  """
  POST /projects : Create a New Project
  """
  form = ProjectForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    project = Project(
      name=form.data['name'],
      description=form.data['description'],
      creator_id=form.data['creator_id']
    )

    db.session.add(project)
    db.session.commit()

    return project.all_details(), 201
  return form.errors, 400

@project_routes.route('/')
def get_all_projects():
  """
  Query for all projects and returns them in a list of project dictionaries
  """
  projects = Project.query.all()
  return {"projects" : [project.all_details() for project in projects]}

@project_routes.route('/<int:id>')
@login_required
def get_one_project(id):
  """
  Query for a project by id and returns that project in a dictionary
  """
  project = Project.query.get(id)
  return project.all_details()

@project_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_project(id):
  """
  DELETE /projects/:project_id : Delete a Project by ID
  """
        
  project = Project.query.get(int(id))
  if not project:
    return {"message": "Project not found"}, 404
  elif project.creator_id != current_user.id:
    return {"message": "Project not owned"}, 403
  else:
    db.session.delete(project)
    db.session.commit()
    return {"message":"Successfully Deleted"}
  
@project_routes.route("/<int:id>", methods=["PATCH"])
@login_required
def update_project(id):
  """
  PATCH /projects/:project_id : Update a project by ID
  """
  req = request.json
  project = Project.query.get(id)
  
  if not project:
    return {'message': 'project not found'}, 404
  elif project.creator_id != current_user.id:
    return {'message': 'project not Owned'}, 403
  
  if 'name' in req:
    project.name=req['name']
  if 'description' in req:
    project.description=req['description']
    
  db.session.commit()

  return project.all_details(), 200

@project_routes.route("/<int:id>/tickets")
@login_required
def get_all_tickets(id):
  """
  Query for all tickets associated with a project.
  """
  tickets = Ticket.query.filter(Ticket.project_id == id).all()
  # print("\n\n\n", tickets[0].to_dict()['project']['id'], id)
  return [ticket.to_dict() for ticket in tickets]

@project_routes.route("/<int:id>/users/<int:uid>", methods=["POST"])
@login_required
def add_project_user(id, uid):
  pu = Project_User.query.filter(Project_User.user_id == uid, Project_User.project_id == id).all()

  if len(pu) > 0:
    return {'message': "You're already a member."}, 200
  
  project_user = Project_User(user_id=uid, project_id=id, role='member')

  db.session.add(project_user)
  db.session.commit()
  
  return {'message':'Successfully Added'}, 200