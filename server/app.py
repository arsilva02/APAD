from flask import Flask, jsonify, request
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from projectsDatabase import createProject, queryProject, createProject, addUser, updateUsage, checkOutHW, checkInHW # Import the createProject function
from usersDatabase import addUser, __queryUser, login, joinProject, getUserProjectsList
from hardwareDatabase import createHardwareSet, queryHardwareSet, updateAvailability, requestSpace, getAllHwNames

static_folder_path = r"C:\Users\s1003\ProjectAPAD\test\client\flask-frontend\dist"
app = Flask(__name__, static_folder=static_folder_path)
CORS(app)

MONGO_URI = "mongodb+srv://apadTeam:APADisawesome%21@cluster.ig2qffr.mongodb.net/db?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client['db']

@app.route('/main') #Check with team what to do with this
def mainPage():
    return jsonify({})

@app.route('/get_user_projects_list', methods=['POST'])
def get_user_projects_list():
    return jsonify({})

@app.route('/get_all_hw_names', methods=['POST'])
def get_all_hw_names():
    return jsonify({})

@app.route('/get_hw_info', methods=['POST'])
def get_hw_info():
    return jsonify({})

@app.route('/check_out', methods=['POST'])
def check_out():
    return jsonify({})

@app.route('/check_in', methods=['POST'])
def check_in():
    return jsonify({})

@app.route('/create_hardware_set', methods=['POST'])
def create_hardware_set():
    return jsonify({})

@app.route('/inventory', methods=['GET']) #To check with the team if needed
def check_inventory():
    return jsonify({})

@app.route('/add_user', methods=['POST']) #Working
def add_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if db['users'].find_one({'username': username}):
        return jsonify({'message': 'User already exists!', 'success': False}), 400

    hashed_password = generate_password_hash(password)
    db['users'].insert_one({'username': username, 'password': hashed_password})
    return jsonify({'message': 'User created successfully', 'success': True}), 201

@app.route('/login', methods=['POST']) #Working
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = db['users'].find_one({'username': username})

    if user and check_password_hash(user['password'], password):
        return jsonify({'message': 'Login successful!', 'success': True}), 200
    else:
        return jsonify({'message': 'Invalid username or password.', 'success': False}), 401

@app.route('/create_project', methods=['POST']) #Working, still check
def create_project():
    data = request.get_json()
    project_name = data.get('project_name')
    project_id = data.get('project_id')
    description = data.get('description')

    if not all([project_name, project_id, description]):
        return jsonify({'message': 'Missing required fields', 'success': False}), 400

    try:
        createProject(client, project_name, project_id, description)
        return jsonify({'message': 'Project created successfully', 'success': True}), 201

    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

@app.route('/get_project_info', methods=['POST']) #Working, still check
def get_project_info():
    data = request.get_json()
    project_id = data.get('project_id')
    if not project_id:
        return jsonify({'message': 'Missing project_id', 'success': False}), 400

    try:
        project_info = queryProject(client, project_id)

        if project_info:
            # Convert ObjectId to string for JSON serialization
            project_info['_id'] = str(project_info['_id'])
            return jsonify({'project': project_info, 'success': True}), 200
        else:
            return jsonify({'message': 'Project not found', 'success': False}), 404

    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

@app.route('/join_project', methods=['POST']) #Check on this
def join_project():
    data = request.get_json()
    project_id = data.get('project_id')  # Ensure project_id is included in the request
    user_id = data.get('username')

    if not all([project_id, user_id]):
        return jsonify({'message': 'Missing project_id or user_id', 'success': False}), 400

    try:
        success = addUser(client, project_id, user_id)
        if success:
            return jsonify({'message': 'User added to project successfully', 'success': True}), 200
        else:
            return jsonify({'message': 'Failed to add user to project', 'success': False}), 404

    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500
        
if __name__ == '__main__':
    app.run(debug=True)
