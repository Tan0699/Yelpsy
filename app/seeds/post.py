from app.models import db, Post, environment, SCHEMA

def seed_posts():
    post1 = Post(name='Japanese Ramen Tonkatsu -Tasty Homemade Food - Grown in the Kitchen - Not From Hmart Trust', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=20,image="https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",shop_id=1)
    post2 = Post(name='Shoyo', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=20.5,image="https://www.elmundoeats.com/wp-content/uploads/2021/02/FP-Quick-30-minutes-chicken-ramen.jpg",shop_id=1)
    post3 = Post(name='Shroom', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://pinchofyum.com/wp-content/uploads/Quick-Homemade-Ramen-Square.png",shop_id=1)
    post4 = Post(name='Chiken', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=20,image="https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/6:9/w_2320,h_3480,c_limit/HLY-Veggie-Ramen-16x9.jpg",shop_id=1)
    post5 = Post(name='Soy', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=20.5,image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190208-delish-ramen-horizontal-093-1550096715.jpg",shop_id=1)
    post6 = Post(name='Vegan', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg/1200px-Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg",shop_id=1)
    post7 = Post(name='Spicy', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=20,image="https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg",shop_id=1)
    post8 = Post(name='Beef', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=20.5,image="https://www.halfbakedharvest.com/wp-content/uploads/2021/10/Easy-Ginger-Chicken-and-Spinach-Ramen-1.jpg",shop_id=1)
    post9 = Post(name='Hot Chili', user_id=1, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://www.piesandtacos.com/wp-content/uploads/2020/12/galaxy-macarons-2-500x500.jpg",shop_id=1)
    post10 = Post(name='Purple', user_id=2, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://www.foodnetwork.com/content/dam/images/food/fullset/2014/4/11/0/FNM_050114-French-Macaroons-Recipe_s4x3.jpg",shop_id=2)
    post11 = Post(name='Gree', user_id=2, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://www.thetipsymacaron.com/wp-content/uploads/cotton-candy-macarons.jpg",shop_id=2)
    post12 = Post(name='Blue', user_id=2, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://www.wilton.com/dw/image/v2/AAWA_PRD/on/demandware.static/-/Sites-wilton-project-master/default/dwdcf97dc4/images/project/WLPROJ-9063/MeMaHa_39783%205.jpg",shop_id=2)
    post13 = Post(name='Red', user_id=2, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://brokenovenbaking.com/wp-content/uploads/2021/08/rainbow-macarons-19.jpg",shop_id=2)
    post14 = Post(name='Yellow', user_id=2, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://recipesblob.oetker.com/files/96b1ad47326547e0aed40738682b5e3e/9e07971e896b475c9e1cdbf635dcc6f9/750x910/raiinbow-macaron-2.jpg",shop_id=2)
    post15 = Post(name='Orange', user_id=2, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://littlesunnykitchen.com/wp-content/uploads/2021/12/Christmas-Macarons-Peppermint-1.jpg",shop_id=2)
    post16 = Post(name='Black', user_id=2, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://www.bigbearswife.com/wp-content/uploads/2018/03/Blue-Raspberry-Macarons-7-720x540.jpg",shop_id=2)
    post17 = Post(name='White', user_id=2, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://images.squarespace-cdn.com/content/v1/54151d7ee4b0a43a90459ae2/1600743669497-K2E8VHORQLKVTXV7FA0L/shutterstock_1115170646.jpg",shop_id=2)
    post18 = Post(name='Birria', user_id=3, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://www.billyparisi.com/wp-content/uploads/2021/04/birria-tacos-1.jpg",shop_id=3)
    post19 = Post(name='Meat', user_id=3, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://www.pressurecookrecipes.com/wp-content/uploads/2021/01/instant-pot-birria.jpg",shop_id=3)
    post20 = Post(name='Lamb', user_id=3, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://cookswellwithothers.com/wp-content/uploads/2021/11/IMG_6579.jpg",shop_id=3)
    post21 = Post(name='Steak', user_id=3, description="Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good Very good ",price=1.99,image="https://i0.wp.com/images.303magazine.com/uploads/2021/02/65303524_687399341696805_6237402028398608384_o.jpg",shop_id=3)
   

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.add(post21)
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