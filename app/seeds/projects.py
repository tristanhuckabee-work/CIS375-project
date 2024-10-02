from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text


def seed_projects():
    projects = [
        ['Demo Project 1', 1, 'This is the description for a Demo Project'],
        ['Demo Project 2', 3, 'This is the description for a Demo Project'],
        ['Demo Project 3', 5, 'This is the description for a Demo Project'],
        ['Demo Project 4', 4, 'This is the description for a Demo Project'],
        ['Demo Project 5', 5, 'This is the description for a Demo Project']
    ]
    
    for project in projects:
        n,c,d = project
        
        temp = Project(name=n, creator_id=c, description=d)
        
        db.session.add(temp)
    
    db.session.commit()


def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
        
    db.session.commit()