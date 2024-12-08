from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class TicketNote(db.Model):
    __tablename__ = 'ticket_notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tickets.id")), nullable=False)
    content = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    creator = db.relationship("User", back_populates="notes")
    ticket = db.relationship("Ticket", back_populates="notes")


    def to_dict(self):
        """
            Returns all ticket_note details as a dictionary
        """
        return {
            'id': self.id,
            'creator': self.creator.min_details(),
            'ticket_id': self.ticket_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }