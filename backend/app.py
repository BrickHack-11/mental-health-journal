import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask

load_dotenv()
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

app = Flask(__name__)

INSERT_USER = (
    "INSERT INTO users"
)

INSERT_JOURNAL = (
    ""    
)

# Your routes here
@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode here
