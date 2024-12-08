from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import TicketNote, db
from app.forms import TicketForm

ticket_note_routes = Blueprint('ticket-notes', __name__)

@ticket_note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_ticket_note(id):
  """
  DELETE /ticket-notes/:ticket_note_id : Delete a ticket_note by ID
  """
  tnote = TicketNote.query.get(int(id))
  if not tnote:
    return {'message':'Ticket Note not found'}, 404
  
  db.session.delete(tnote)
  db.session.commit()
  return {'message':'Successfully Deleted'}
