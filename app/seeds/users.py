from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='Demo', email='demo@aa.io', password='password',image="https://randomuser.me/api/portraits/men/93.jpg")
    marnie = User(
        firstname='marnie', email='marnie@aa.io', password='password',image="https://randomuser.me/api/portraits/men/22.jpg")
    bobbie = User(
        firstname='bobbie', email='bobbie@aa.io', password='password',image="https://randomuser.me/api/portraits/men/68.jpg")
    Chen = User(
        firstname='Chen', email='Tan@aa.io', password='password',image="https://randomuser.me/api/portraits/men/86.jpg")
    Coco = User(
        firstname='Coco', email='Coco@aa.io', password='password',image="https://randomuser.me/api/portraits/lego/5.jpg")
    Sesi = User(
        firstname='Sesi', email='Sesi@aa.io', password='password',image="https://randomuser.me/api/portraits/men/1.jpg")
    c1 =User(firstname="Hewet",email="hsline0@mac.com",password="Layo",image="https://randomuser.me/api/portraits/women/76.jpg")
    c2 = User(firstname="Cathy",email="creedshaw1@adobe.com",password="Longqiao",image="https://randomuser.me/api/portraits/women/2.jpg")
    c3 = User(firstname="Carlie",email="csalthouse2@prnewswire.com",password="Bara Datu",image="https://randomuser.me/api/portraits/women/16.jpg")
    c4 = User(firstname="Melba",email="mzanussii3@wikispaces.com",password="Rendeng",image="https://randomuser.me/api/portraits/women/68.jpg")
    c5 = User(firstname="Stevana",email="sayliff4@histats.com",password="Okhotsk",image="https://randomuser.me/api/portraits/women/56.jpg")
    c6 = User(firstname="Mason",email="mcollacombe5@webs.com",password="Makati City",image="https://randomuser.me/api/portraits/men/77.jpg")
    c7 = User(firstname="Liva",email="lmasi6@thetimes.co.uk",password="Cibeureum Satu",image="https://randomuser.me/api/portraits/women/27.jpg")
    c8 = User(firstname="Hartley",email="hnias7@psu.edu",password="São Lourenço",image="https://randomuser.me/api/portraits/men/92.jpg")
    c9 = User(firstname="Wadsworth",email="wmaccolm8@apache.org",password="Cuispes",image="https://randomuser.me/api/portraits/men/76.jpg")
    c10 = User(firstname="Randell",email="rducrow9@qq.com",password="Obonoma",image="https://randomuser.me/api/portraits/men/85.jpg")
    c11 = User(firstname="Juana",email="jmcnamaraa@deviantart.com",password="Malandag",image="https://randomuser.me/api/portraits/men/12.jpg")
    c12 = User(firstname="Lynda",email="llefleyb@wikia.com",password="Maralal",image="https://randomuser.me/api/portraits/men/45.jpg")
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Chen)
    db.session.add(Coco)
    db.session.add(Sesi)
    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.add(c6)
    db.session.add(c7)
    db.session.add(c8)
    db.session.add(c9)
    db.session.add(c10)
    db.session.add(c11)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()