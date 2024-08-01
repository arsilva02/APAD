from flask import Flask, jsonify, request
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash  # Import check_password_hash for password verification
from bson import ObjectId

import hardwareDatabase
import projectsDatabase
import usersDatabase

static_folder_path = r"C:\Users\s1003\Downloads\flask-mongo-master\flask-mongo-master\Frontend\dist"
app = Flask(__name__, static_folder=static_folder_path)

MONGO_URI = "mongodb+srv://apadTeam:APADisawesome%21@cluster.ig2qffr.mongodb.net/db?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)

db = client['db']

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if db['users'].find_one({'username': username}):
        return jsonify({'message': 'User already exists!', 'success': False}), 400

    hashed_password = generate_password_hash(password)
    db['users'].insert_one({'username': username, 'password': hashed_password})
    return jsonify({'message': 'User created successfully', 'success': True}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = db['users'].find_one({'username': username})

    if user and check_password_hash(user['password'], password):
        return jsonify({'message': 'Login successful!', 'success': True}), 200
    else:
        return jsonify({'message': 'Invalid username or password.', 'success': False}), 401

@app.route('/create_project', methods=['POST'])
def create_project():
    data = request.get_json()
    project_name = data.get('project_name')
    description = data.get('description')
    start_date = data.get('start_date')
    end_date = data.get('end_date')

    if not all([project_name, description, start_date, end_date]):
        return jsonify({'message': 'Missing required fields', 'success': False}), 400

    try:
        projects_collection = db['projects']

        new_project = {
            'project_name': project_name,
            'description': description,
            'start_date': start_date,
            'end_date': end_date
        }
        projects_collection.insert_one(new_project)

        return jsonify({'message': 'Project created successfully', 'success': True}), 201

    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500
    
if __name__ == '__main__':
    app.run(debug=True)