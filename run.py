import eel
from pymongo import MongoClient


def mongo_init():  # Local function
    global user

    client = MongoClient('localhost', 27017)
    db = client.eel_database
    user = db.users


@eel.expose  # Eel function
def set_title():  # Example to send data for javascript/html
    return "Code example - Eel + Bootstrap 4 + MongoDb"


@eel.expose  # Eel function
def save_user(email, password):
    dict_user = {"email": email, "password": password}
    user.insert_one(dict_user).inserted_id


@eel.expose  # Eel function
def drop_database():
    client = MongoClient('localhost', 27017)
    client.drop_database('eel_database')


@eel.expose  # Eel function
def get_users():
    all_users = []
    cursor = user.find({})
    for x in cursor:
        x.pop("_id")  # Remove objects id
        all_users.append(x)
    return all_users


if __name__ == '__main__':
    eel.init('web')  # Give folder containing web files
    mongo_init()  # Init mongodb
    eel.start('index.html', size=(800, 600))    # Start
