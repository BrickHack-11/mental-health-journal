import os
import psycopg2
import bcrypt
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import genAI
from datetime import datetime
from flask_cors import CORS

load_dotenv()
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

app = Flask(__name__)
CORS(app)

INSERT_USER = (
    """
    INSERT INTO "User" (fname, lname, birthdate, email, password, gender)
    VALUES (%(fname)s, %(lname)s, %(birthdate)s, %(email)s, %(password)s, %(gender)s);
    """
)
# Your routes here
@app.post('/signup')
def add_user():
    try:
        data = request.get_json()
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        params = {
            "fname" : data['fname'],
            "lname" : data['lname'],
            "email" : data['email'],
            "gender" : data['gender'],
            "birthdate" : data['birthdate'],
            "password" : hashed_password.decode('utf-8')
        }
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(INSERT_USER, params)
        connection.commit()
        return jsonify({"message": "User added successfully!"}), 201
    except psycopg2.IntegrityError as e:
        return jsonify({"error": "User already exists (duplicate email)"}), 409  # Conflict
    except psycopg2.Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500  # Internal Server Error

    except Exception as e:
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500  # Catch-all error

    finally:
        if 'connection' in locals():
            connection.close()  # Ensure connection is closed

LOGIN_QUERY = (
    """
    SELECT password FROM "User" WHERE email = %(email)s;
    """
)

@app.post('/login')
def login():
    try:
        data = request.get_json()
        params = {
            "email": data["email"]
        }
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(LOGIN_QUERY, params)
                result = cursor.fetchone()
                if not result:
                    return jsonify({"error": "User not found"}), 404  # Not Found
                
                stored_hashed_password = result[0]  # Extract hashed password from result

                # Verify password
                if not bcrypt.checkpw(data["password"].encode('utf-8'), stored_hashed_password.encode('utf-8')):
                    return jsonify({"error": "Invalid password"}), 401
                
                return jsonify({"message": "User login successful"}), 201
    except psycopg2.Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500  # Internal Server Error

    except Exception as e:
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500  # Catch-all error

    finally:
        if 'connection' in locals():
            connection.close()  # Ensure connection is closed

GET_USER_ID = (
    """
    SELECT id, birthdate, gender from "User" Where email = %(email)s;
    """
)

ADD_JOURNAL_ENTRY = (
    """
    INSERT INTO journal_entry(u_id, date_time, mood, log_entry, contribution, sleep_quality, sentiment, responses)
    VALUES (%(u_id)s, %(date_time)s, %(mood)s, %(log_entry)s, %(contri)s, %(sleep)s, %(senti)s, %(responses)s);
    """
)

@app.post('/journal')
def add_journal():
    try:
        data = request.get_json()
        params1 = {
            "email": data["email"]
        }
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(GET_USER_ID, params1)
                result = cursor.fetchone()
                if not result:
                    return jsonify({"message": "User not found!"}), 404
 
                u_id, date, gender = result               
                age = datetime.today().year - date.year
                sentiment, genAI_res = genAI.get_self_care_suggestion(age, gender, data["mood"], data["contribution"], data["log_entry"])
                params2 = {
                    "u_id": u_id,
                    "date_time": datetime.now(),
                    "mood": data["mood"],
                    "log_entry": data["log_entry"],
                    "contri": data["contribution"],
                    "sleep": data["sleep"],
                    "senti": sentiment,
                    "responses": genAI_res
                }
                cursor.execute(ADD_JOURNAL_ENTRY, params2)
        connection.commit()
        return jsonify({"message": "Entry Successful!"}), 201
    except psycopg2.Error as e:
        return jsonify({"error": "Database error", "details": str(e)}), 500  # Internal Server Error
    except Exception as e:
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500  # Catch-all error

    finally:
        if 'connection' in locals():
            connection.close()  # Ensure connection is closed

GET_JOURNAL_ENTRIES = (
    """
    SELECT date_time, mood, sleep_quality, log_entry, sentiment, responses FROM journal_entry Where u_id = %(u_id)s ORDER BY date_time;
    """
)

@app.get('/journal')
def get_entries():
    data = request.get_json()
    params1 = {
        "email": data["email"]
    }
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_USER_ID, params1)
            result = cursor.fetchone()
            if not result:
                return jsonify({"message": "User not found!"}), 404
            u_id = result[0]
            params2 = {
                "u_id": u_id
            }
            cursor.execute(GET_JOURNAL_ENTRIES, params2)
            journal_entries = cursor.fetchall()
            if not journal_entries:
                return jsonify({"message": "No journal entries found!"}), 404
            entries = [{
                        "entry_id": entry[0], 
                        "mood": entry[1],
                        "sleep_quality": entry[2],
                        "log_entry": entry[3],
                        "sentiment": entry[4],
                        "responses": entry[5]
                        } for entry in journal_entries]  # Adjust indices based on your database schema

    return jsonify({"entries": entries}), 200
if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode here
