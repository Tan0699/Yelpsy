from app.models import db, Review, environment, SCHEMA
from datetime import datetime,date
def seed_reviews():
    re1 = Review(created_at =  date.fromisoformat('2023-12-04'),rating=1, user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",image="https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",shop_id=1)
    re2 = Review(created_at =  date.fromisoformat('2013-12-04'),rating=2, user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",image="https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",post_id=1)
   
    db.session.add(re1)
    db.session.add(re2)
  
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")
        
    db.session.commit()