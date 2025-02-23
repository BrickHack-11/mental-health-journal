import os
import psycopg2
import bcrypt
from dotenv import load_dotenv
from flask import Flask, request, jsonify

load_dotenv()
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode here
