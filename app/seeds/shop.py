from app.models import db, Shop, environment, SCHEMA

def seed_shops():
    shop1 = Shop(name='Ramen', user_id=1, description="Authentic Japanese ramen",image="ramen.com")
    shop2 = Shop(name='Boba', user_id=2, description="Freshmade daily",image="Boba.com")
    shop3 = Shop(name='Mushroom', user_id=3, description="Grown in my backyard",image="Mushroom.com")
    
   

    db.session.add(shop1)
    db.session.add(shop2)
    db.session.add(shop3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM shops")
        
    db.session.commit()