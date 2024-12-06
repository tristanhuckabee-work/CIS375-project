from app.models import db, Ticket, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tickets():
    tickets = [
        [1,1,'Demo Ticket','This is a ticket created for demonstrational purposes.',3,1],
        [1,1,'Demo Ticket','This is a ticket created for demonstrational purposes.',1,0],
        [2,2,'Demo Ticket','This is a ticket created for demonstrational purposes.',0,1],
        [3,3,'Demo Ticket','This is a ticket created for demonstrational purposes.',2,1],
        [4,4,'Demo Ticket','This is a ticket created for demonstrational purposes.',1,1],
        [5,5,'Demo Ticket','This is a ticket created for demonstrational purposes.',4,1]
    ]
    
    for ticket in tickets:
        c,t,n,d,p,s = ticket
        
        temp = Ticket(
            creator_id=c,
            project_id=t,
            name=n,
            description=d,
            priority=p,
            status=s
        )
        
        db.session.add(temp)
    
    db.session.commit()


def undo_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tickets"))
        
    db.session.commit()