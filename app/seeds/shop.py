from app.models import db, Shop, environment, SCHEMA

def seed_shops():
    shop1 = Shop(name='Ramen', user_id=1, description="This supa good noodles, fresh trus me bro, no preservatives :),made from my backyard yeeeeee",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe36RfrAGJot_RsapxQCYZx4fUPEuAESMbw&usqp=CAU")
    shop2 = Shop(name='Macaron', user_id=2, description="This take me 10 years to make recipe,I travel over mountain for school to learn everyday, buy from me or I will appear from under ur bed",image="https://www.mealsbymolly.com/wp-content/uploads/2021/04/Macarons.jpg")
    shop3 = Shop(name='Taco', user_id=3, description="I love me some good tacos, not that tacobell stuff this the good stuff trus. I give u discount if u not hapopy with mah food",image="https://logos-world.net/wp-content/uploads/2021/10/Taco-Bell-Logo.png")
    shop4 = Shop(name='Water', user_id=1, description="This supa good cake, fresh trus me bro, no preservatives lotsov msg like uncle roger says makes it super yummy",image="https://marketplace.canva.com/EAE4zJkfVJk/1/0/1600w/canva-pink-white-minimalist-cake-shop-on-instagram-post-vYajkfQ6pbM.jpg")
    shop5 = Shop(name='Cakes', user_id=2, description="This take me 10 years to make recipe,I travel over mountain for school to learn everyday, buy from me or I will appear from under ur bed",image="https://images.squarespace-cdn.com/content/v1/600388b4259ef06ca93a16b2/1610844662758-AEYXMY327P8EJ70D0EB6/TCS%2B-%2BLOGO%2B2.jpg")
    shop6 = Shop(name='Cookies', user_id=3, description="I love me some good cookies, It full of sugar but we are here for a good time not a long time. I give u discount if u not hapopy with mah food",image="https://s3-us-west-2.amazonaws.com/assets.eastidahonews.com/wp-content/uploads/2019/04/24161406/cookie-place.jpg")
   

    db.session.add(shop1)
    db.session.add(shop2)
    db.session.add(shop3)
    db.session.add(shop4)
    db.session.add(shop5)
    db.session.add(shop6)
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