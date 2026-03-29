from pymongo import MongoClient
import os
from dotenv import load_dotenv
from pathlib import Path

# Base dir is NorthHall/
BASE_DIR = Path(__file__).resolve().parent.parent
# Load .env from root
load_dotenv(BASE_DIR.parent / '.env')

db_url = os.getenv('MONGODB_URL')
db_name = os.getenv('MONGODB_NAME', 'NorthHall')

try:
    if db_url:
        client = MongoClient(db_url, serverSelectionTimeoutMS=5000)
        # Trigger a connection to check if it's working
        client.admin.command('ping')
        db = client[db_name]
        print("Connected to MongoDB Atlas")
    else:
        print("MONGODB_URL not found in .env")
        db = None
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    # Fallback to a mock or local db if needed, 
    # but for now we'll just let it be None and handle it in views
    db = None
