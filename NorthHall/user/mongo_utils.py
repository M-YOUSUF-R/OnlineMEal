from pymongo import MongoClient

db_url = "mongodb+srv://yousufmazumder12:yousufmazumder12@northhalluseracc.2uudkr4.mongodb.net/"
db_name = "NorthHall"
client = MongoClient(db_url)

db = client[db_name]
