from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='Demo', email='demo@aa.io', password='password',image="https://s3-us-west-2.amazonaws.com/assets.eastidahonews.com/wp-content/uploads/2019/04/24161406/cookie-place.jpg")
    marnie = User(
        firstname='marnie', email='marnie@aa.io', password='password',image="https://images.squarespace-cdn.com/content/v1/600388b4259ef06ca93a16b2/1610844662758-AEYXMY327P8EJ70D0EB6/TCS%2B-%2BLOGO%2B2.jpg")
    bobbie = User(
        firstname='bobbie', email='bobbie@aa.io', password='password',image="https://marketplace.canva.com/EAE4zJkfVJk/1/0/1600w/canva-pink-white-minimalist-cake-shop-on-instagram-post-vYajkfQ6pbM.jpg")
    Chen = User(
        firstname='Chen', email='Tan@aa.io', password='password',image="https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg")
    Coco = User(
        firstname='Coco', email='Coco@aa.io', password='password',image="https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg")
    Sesi = User(
        firstname='Sesi', email='Sesi@aa.io', password='password',image="https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg")
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Chen)
    db.session.add(Coco)
    db.session.add(Sesi)
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