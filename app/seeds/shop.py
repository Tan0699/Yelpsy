from app.models import db, Shop, environment, SCHEMA

def seed_shops():
    shop1 = Shop(name='Ramen', user_id=1, description="This supa good noodles, fresh trus me bro, no preservatives :),made from my backyard yeeeeee",image="https://images.all-free-download.com/images/graphicwebp/beautiful_beauty_decoration_272075.webp")
    shop2 = Shop(name='Macaron', user_id=2, description="This take me 10 years to make recipe,I travel over mountain for school to learn everyday, buy from me or I will appear from under ur bed",image="https://images.all-free-download.com/images/graphicwebp/restaurant_by_the_sea_200061.webp")
    shop3 = Shop(name='Taco', user_id=3, description="I love me some good tacos, not that tacobell stuff this the good stuff trus. I give u discount if u not hapopy with mah food",image="https://images.all-free-download.com/images/graphicwebp/belmsdorf_germany_building_234334.webp")
    shop4 = Shop(name='Water', user_id=4, description="This supa good cake, fresh trus me bro, no preservatives lotsov msg like uncle roger says makes it super yummy",image="https://images.all-free-download.com/images/graphicwebp/new_york_city_tavern_on_the_green_restaurant_222748.webp")
    shop5 = Shop(name='Cakes', user_id=5, description="This take me 10 years to make recipe,I travel over mountain for school to learn everyday, buy from me or I will appear from under ur bed",image="https://images.all-free-download.com/images/graphicwebp/beach_chair_table_chair_269677.webp")
    shop6 = Shop(name='Cookies', user_id=6, description="I love me some good cookies, It full of sugar but we are here for a good time not a long time. I give u discount if u not hapopy with mah food",image="https://images.all-free-download.com/images/graphicwebp/restaurant_and_cabin_at_copper_falls_at_copper_falls_state_park_wisconsin_593309.webp")
    shop7 = Shop(name="Tobe",user_id=1,description="From the outside it looks disturbing, rough and unenjoyable. Small stones and intricate stone carvings make up most of the building's outer structure..",image="https://images.all-free-download.com/images/graphicwebp/restaurant_table_185710.webp")
    shop8 = Shop(name="Cointon",user_id=2,description="As you enter the tavern through the old, hardwooden door, you're welcomed by watching eyes and a few groans.The bartender is lying in a chair, doing",image="https://images.all-free-download.com/images/graphicwebp/flower_rich_restaurant_190692.webp")
    shop9 = Shop(name="Raquel",user_id=3,description="It's as gloomy inside as it is on the outside. Several walls support the upper floor and the lanterns attached to them. The walls are decorated with mounted animal heads ",image="https://images.all-free-download.com/images/graphicwebp/breakfast_eggs_roll_236124.webp")
    shop10 = Shop(name="Tessie",user_id=4,description="The tavern itself is almost completely abanonded. The few people inside probably work less honorable operations, but whoever they are, they give you an unco",image="https://images.all-free-download.com/images/graphiclarge/table_place_setting_194416.jpg")
    shop11 = Shop(name="Nickola",user_id=5,description="You did hear rumors about this tavern, supposedly it's infamous for something, but for the life of you you can't remember what for. Though juding by the dirt",image="https://images.all-free-download.com/images/graphiclarge/pelican_192996.jpg")
    shop12 = Shop(name="Bastian",user_id=6,description="From the outside it looks peaceful, well maintained and homey. Stacked stones and marble pillars make up most of the building's outer structure.",image="https://images.all-free-download.com/images/graphiclarge/ishnala_restaurant_building_at_mirror_lake_state_park_wisconsin_589880.jpg")
    shop13 = Shop(name="Gerianna",user_id=7,description="As you enter the tavern through the decorated, metal door, you're welcomed by laughing voices and cheerful singing.",image="https://images.all-free-download.com/images/graphiclarge/the_wine_selection_189322.jpg")
    shop14 = Shop(name="Barbey",user_id=8,description="It's as engaging inside as it is on the outside. Stone beams support the upper floor and the fans attached to them. The walls are full of paintings, ",image="https://images.all-free-download.com/images/graphiclarge/candle_holder_and_flowers_190618.jpg")
    shop15 = Shop(name="Maria",user_id=9,description="As you enter the tavern through the decorated, metal door, you're welcomed by laughing voices and cheerful singing.",image="https://images.all-free-download.com/images/graphiclarge/dollar_soup_188272.jpg")
    shop16 = Shop(name="Annissa",user_id=10,description="The tavern itself is packed. Soldiers seem to be the primary clientele here, which could be seen as the best sign you can get. Several long tables are occupied by, ",image="https://images.all-free-download.com/images/graphiclarge/kitchen_south_korea_culinary_271404.jpg")
    shop17 = Shop(name="Tommi",user_id=11,description="You did hear rumors about this tavern, supposedly it's famous for something, but you can't remember what for. Though judging by the amount of women in this tave ",image="https://images.all-free-download.com/images/graphiclarge/segovia_spain_city_268618.jpg")
    shop18 = Shop(name="Jany",user_id=12,description="From the outside it looks gloomy, horrible and unenjoyable. Large stones and hardwooden tree trunks make up most of the building's outer structure.",image="https://images.all-free-download.com/images/graphiclarge/breakfast_eggs_roll_237854.jpg")
    shop19 = Shop(name="Gilberta",user_id=13,description="As you enter the tavern through the old, metal door, you're welcomed by the sound of the wind outside and dirt and dust from all places.",image="https://images.all-free-download.com/images/graphiclarge/chocolate_cake_205866.jpg")
    shop20 = Shop(name="Aurea",user_id=14,description="It's as dull inside as it is on the outside. Marble pillars support the upper floor and the rows of small, broken lights attached to them. The walls are covered",image="https://images.all-free-download.com/images/graphiclarge/lunch_with_the_bears_190713.jpg")
    shop21 = Shop(name="Reinwald",user_id=15,description="The tavern itself is almost completely abanonded. The few people inside are silent and they keep to themselves, but whoever they are, they give you an ",image="https://images.all-free-download.com/images/graphiclarge/eiffel_tower_las_vegas_186957.jpg")
   

    db.session.add(shop1)
    db.session.add(shop2)
    db.session.add(shop3)
    db.session.add(shop4)
    db.session.add(shop5)
    db.session.add(shop1)
    db.session.add(shop2)
    db.session.add(shop3)
    db.session.add(shop4)
    db.session.add(shop5)
    db.session.add(shop6)
    db.session.add(shop7)
    db.session.add(shop8)
    db.session.add(shop9)
    db.session.add(shop10)
    db.session.add(shop11)
    db.session.add(shop12)
    db.session.add(shop13)
    db.session.add(shop14)
    db.session.add(shop15)
    db.session.add(shop16)
    db.session.add(shop17)
    db.session.add(shop18)
    db.session.add(shop19)
    db.session.add(shop20)
    db.session.add(shop21)
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