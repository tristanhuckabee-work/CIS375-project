from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Ticket, TicketNote, db
from app.forms import TicketForm

ticket_routes = Blueprint('tickets', __name__)

@ticket_routes.route('/', methods=['POST'])
@login_required
def create_ticket():
  """
  POST /tickets : Create a New Ticket
  """
  form = TicketForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    print('\n\n\n\n\n', form.data)
    ticket = Ticket(
      name=form.data['name'],
      description=form.data['description'],
      creator_id=form.data['creator_id'],
      project_id=form.data['project_id'],
      priority=form.data['priority'],
      status=form.data['status']
    )

    db.session.add(ticket)
    db.session.commit()

    return ticket.to_dict(), 201
  return form.errors, 400

@ticket_routes.route("/<int:id>", methods=["PATCH"])
@login_required
def update_ticket(id):
  """
  PATCH /tickets/:ticket_id : Update a ticket by ID
  """
  req = request.json
  ticket = Ticket.query.get(id)
  
  if not ticket:
    return {'message': 'ticket not found'}, 404
  
  if 'name' in req:
    ticket.name=req['name']
  if 'description' in req:
    ticket.description=req['description']
  if 'priority' in req:
    ticket.priority=req['priority']
  if 'status' in req:
    ticket.status=req['status']
    
  db.session.commit()

  return ticket.to_dict(), 200

@ticket_routes.route('/<int:id>')
@login_required
def get_one_ticket(id):
  """
  Query for a ticket by id and returns that ticket in a dictionary
  """
  ticket = Ticket.query.get(id)
  return ticket.to_dict()


@ticket_routes.route("/<int:id>/notes", methods=["POST"])
@login_required
def create_ticket_note(id):
  req = request.json
  ticket = Ticket.query.get(id)
  
  if not ticket:
    return {'message': 'ticket not found'}, 404
  ticket_note = TicketNote(
      content=req['content'],
      creator_id=req['creator_id'],
      ticket_id=id
    )
    
  db.session.add(ticket_note)
  db.session.commit()

  return ticket_note.to_dict(), 200

@ticket_routes.route("/<int:id>/notes")
@login_required
def get_ticket_notes(id):
  """
  Query for all ticket notes associated with a ticket.
  """
  ticket_notes = TicketNote.query.filter(TicketNote.ticket_id == id).all()

  return [ticket_note.to_dict() for ticket_note in ticket_notes]