import flask
from flask import jsonify
from flask import request, render_template, redirect, url_for
import creds
from sql import create_connection
from sql import execute_read_query
from sql import execute_query
import mysql.connector
import hashlib
import logging
import requests

app = flask.Flask(__name__)
app.config["DEBUG"] = True  # allow showing errors in the browser

# MySQL Configuration
connection = mysql.connector.connect(
    host="cis3368fall2023.c1eeeidrpfau.us-east-1.rds.amazonaws.com",
    user="admin",
    password="580091Sydney",
    database="cis3368falldb"
)

# Exception Handling Function
def handle_error(message):
    return jsonify({"error": message}), 500

# Hardcoded username and hashed password (for demonstration purposes)
users = {
    "admin": "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"  # Hash of "password123"
}

# Login page route
@app.route('/', methods=['GET'])
def login_page():
    return render_template('login.html')  # Create an HTML login page

# Login endpoint
@app.route('/api/login', methods=['GET'])
def login():
    try:
        username = request.args.get('username')
        password = request.args.get('password')

        # Check if the provided username exists
        if username in users:
            # Hash the provided password and compare it with the stored hashed password
            hashed_password = hashlib.sha256(password.encode()).hexdigest()
            if users[username] == hashed_password:
                # Print a message to help with debugging
                print("Login successful")
                # Redirect to the landing page on successful login
                return redirect(url_for('landing_page'))

        # Print a message to help with debugging
        print("Invalid username or password")
        return handle_error("Invalid username or password", 401)
    except Exception as e:
        # Print the exception to help with debugging
        print(f"An unexpected error occurred: {str(e)}")
        return handle_error("An unexpected error occurred")
    
# Landing page route
@app.route('/landing', methods=['GET'])
def landing_page():
    return render_template('index.html')  # Assuming you have the template file in a "templates" folder

# Route for managing floors
@app.route('/manage_floors', methods=['GET'])
def manage_floors():
    try:
        # Make a GET request to the /api/floors/all API
        response = requests.get('http://127.0.0.1:5000/api/floors/all')
        
        if response.status_code == 200:
            floors = response.json()
            return render_template('manage_floors.html', floors=floors)
        else:
            return handle_error("Failed to fetch floor data", response.status_code)
    except Exception as e:
        app.logger.error(f"An unexpected error occurred: {str(e)}")
        return handle_error("An unexpected error occurred")

# Route for managing rooms
@app.route('/manage_rooms', methods=['GET'])
def manage_rooms():
    try:
        # Make a GET request to the /api/rooms/all API
        response = requests.get('http://127.0.0.1:5000/api/rooms/all')

        if response.status_code == 200:
            rooms = response.json()
            return render_template('manage_rooms.html', rooms=rooms)  # Listed the template name
        else:
            return handle_error("Failed to fetch room data", response.status_code)
    except Exception as e:
        app.logger.error(f"An unexpected error occurred: {str(e)}")
        return handle_error("An unexpected error occurred")

# Route for managing occupants(residents)
@app.route('/manage_occupants', methods=['GET'])
def manage_occupants():
    try:
        # Made it load a GET request to the /api/residents/all API
        response = requests.get('http://127.0.0.1:5000/api/residents/all')

        if response.status_code == 200:
            occupants = response.json()
            return render_template('manage_occupants.html', occupants=occupants)
        else:
            return handle_error("Failed to fetch occupant data", response.status_code)
    except Exception as e:
        app.logger.error(f"An unexpected error occurred: {str(e)}")
        return handle_error("An unexpected error occurred")

# API endpoints to GET all Floors
@app.route('/api/floors/all', methods=['GET'])
def get_floors():
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM floor")
        floors = cursor.fetchall()
        return jsonify(floors)
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
# API endpoint to POST for Floors
@app.route('/api/floors', methods=['POST'])
def create_floor():
    try:
        data = request.get_json()
        level = data['level']
        name = data['name']

        cursor = connection.cursor()
        cursor.execute("INSERT INTO floor (level, name) VALUES (%s, %s)", (level, name))
        connection.commit()
        
        return jsonify({"message": "Floor created successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
# API endpoint to PUT for Floors
@app.route('/api/floors/update_id/<int:id>', methods=['PUT']) # Used integer to delete any id from http://127.0.0.1:5000/api/floors/update_id/4
def update_floor(id):
    try:
        data = request.get_json()
        level = data['level']
        name = data['name']

        cursor = connection.cursor()
        cursor.execute("UPDATE floor SET level = %s, name = %s WHERE id = %s", (level, name, id))
        connection.commit()

        return jsonify({"message": "Floor updated successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
#API endpoint to DELETE for Floors
@app.route('/api/floors/delete_id/<int:id>', methods=['DELETE']) # Used integer to delete any id from http://127.0.0.1:5000/api/floors/delete_id/4
def delete_floor(id):
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM floor WHERE id = %s", (id,))
        connection.commit()

        return jsonify({"message": "Floor deleted successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()

# API endpoints to GET all Rooms
@app.route('/api/rooms/all', methods=['GET'])
def get_rooms():
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM room")
        rooms = cursor.fetchall()
        return jsonify(rooms), 200
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
# API endpoint to POST for Rooms
@app.route('/api/rooms', methods=['POST'])
def create_room():
    try:
        data = request.get_json()
        capacity = data['capacity']
        number = data['number']
        floor_id = data['floor_id']

        cursor = connection.cursor()
        cursor.execute("INSERT INTO room (capacity, number, floor_id) VALUES (%s, %s, %s)", (capacity, number, floor_id))
        connection.commit()
        
        return jsonify({"message": "Room created successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
# API endpoint to PUT for Rooms
@app.route('/api/rooms/update_id/<int:id>', methods=['PUT']) # Used integer to update any id from http://127.0.0.1:5000/api/rooms/update_id/2
def update_room(id):
    try:
        data = request.get_json()
        capacity = data['capacity']
        number = data['number']
        floor_id = data['floor_id']

        cursor = connection.cursor()
        cursor.execute("UPDATE room SET capacity = %s, number = %s, floor_id = %s WHERE id = %s", (capacity, number, floor_id, id))
        connection.commit()

        return jsonify({"message": "Room updated successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
# API endpoint to DELETE for Rooms
@app.route('/api/rooms/delete_id/<int:id>', methods=['DELETE']) # Used integer to delete any id from http://127.0.0.1:5000/api/rooms/delete_id/2
def delete_room(id):
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM room WHERE id = %s", (id,))
        connection.commit()

        return jsonify({"message": "Room deleted successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()

# API endpoints to GET all Residents
@app.route('/api/residents/all', methods=['GET'])
def get_residents():
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM resident")
        residents = cursor.fetchall()
        return jsonify(residents)
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
# API endpoint to POST for Residents
@app.route('/api/residents', methods=['POST'])
def create_resident():
    try:
        data = request.get_json()
        firstname = data['firstname']
        lastname = data['lastname']
        age = data['age']
        room_id = data['room_id']

        cursor = connection.cursor()
        cursor.execute("INSERT INTO resident (firstname, lastname, age, room_id) VALUES (%s, %s, %s, %s)", (firstname, lastname, age, room_id))
        connection.commit()
        
        return jsonify({"message": "Resident created successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
# API endpoint to PUT for Residents
@app.route('/api/residents/update_id/<int:id>', methods=['PUT']) # Used integer to update any id from http://127.0.0.1:5000/api/residents/update_id/5
def update_resident(id):
    try:
        data = request.get_json()
        firstname = data['firstname']
        lastname = data['lastname']
        age = data['age']
        room_id = data['room_id']

        cursor = connection.cursor()
        cursor.execute("UPDATE resident SET firstname = %s, lastname = %s, age = %s, room_id = %s WHERE id = %s", (firstname, lastname, age, room_id, id))
        connection.commit()

        return jsonify({"message": "Resident updated successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()
# API endpoint to DELETE for Residents
@app.route('/api/residents/delete_id/<int:id>', methods=['DELETE']) # Used integer to delete any id from http://127.0.0.1:5000/api/residents/delete_id/5
def delete_resident(id):
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM resident WHERE id = %s", (id,))
        connection.commit()

        return jsonify({"message": "Resident deleted successfully"})
    except Exception as e:
        return handle_error("An unexpected error occurred")
    finally:
        cursor.close()



if __name__ == '__main__':
    app.run(debug=True)
