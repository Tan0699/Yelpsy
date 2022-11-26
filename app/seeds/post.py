from app.models import db, Post, environment, SCHEMA

def seed_posts():
    post1 = Post(name='Tonkatsu', user_id=1, description="Very good",price=20,image="https://cdn.discordapp.com/emojis/652283624363786251.webp?size=128&quality=lossless",shop_id=1)
    post2 = Post(name='Shoyo', user_id=1, description="Salty",price=20.5,image="https://cdn.discordapp.com/emojis/652283624363786251.webp?size=128&quality=lossless",shop_id=1)
    post3 = Post(name='Shroom', user_id=1, description="from my backyard",price=.99,image="https://cdn.discordapp.com/emojis/652283624363786251.webp?size=128&quality=lossless",shop_id=1)
    
   

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
        
    db.session.commit()