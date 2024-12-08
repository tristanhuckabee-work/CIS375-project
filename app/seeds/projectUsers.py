from app.models import db, Project_User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_project_users():
    # [project_id, user_id, role],
    project_users = [
        [1, 1, 'admin'],
        [1, 2, 'member'],
        [1, 3, 'member'],
        [2, 2, 'member'],
        [2, 3, 'admin'],
        [3, 5, 'admin'],
        [3, 4, 'member'],
        [3, 1, 'member'],
        [4, 4, 'admin'],
        [5, 5, 'admin'],
        [5, 2, 'member'],
    ]
    
    for pu in project_users:
        p,u,r = pu
        
        temp = Project_User(user_id=u, project_id=p, role=r)
        
        db.session.add(temp)
    
    db.session.commit()


def undo_project_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.project_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM project_users"))
        
    db.session.commit()