from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    users = [
        ['Demo', 'User', 'yungdemo@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Account"],
        ['John', 'Smith', 'jsmith@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo HR Manager"],
        ['James', 'Williams', 'jwilliams@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Software Engineer"],
        ['Jane', 'Doe', 'jdoe@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Software Engineer"],
        ['Josie', 'McBride', 'jmcbride@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Product Design Lead"],
        ['Brad', 'Thompson', 'bthompson@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Marketing Lead"],
        ['William', 'Devi', 'wdevi@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Director of Marketing"],
        ['Bill', 'Seacaster', 'bseacaster@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Marketing Assistant"],
        ['Tabitha', 'Salem', 'tsalem@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Intern"],
        ['Narra', 'Narra', 'nnarra@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Intern"],
        ['Callum', 'Malek', 'cmalek@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Intern"],
        ['Rami', 'Ouadne', 'rouadne@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Intern"],
        ['Jane', 'Foster', 'jfoster@demo.com', '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e', "Demo Intern"]
    ]
    
    for user in users:
        f,l,e,p,pp = user
        
        temp = User(first_name=f, last_name=l, email=e, password=p, position=pp)
        
        db.session.add(temp)
    
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()