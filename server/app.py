from flask import Flask, jsonify, request
from pymongo import MongoClient
from werkzeug.security import generate_password_hash
from flask_cors import CORS
from projectsDatabase import createProject, queryProject, createProject, joinUser, updateUsage, checkOutHW, checkInHW # Import the createProject function
from usersDatabase import addUser, __queryUser, login, joinProject, getUserProjectsList
from hardwareDatabase import createHardwareSet, queryHardwareSet, updateAvailability, requestSpace, getAllHwNames

static_folder_path = r"C:\Users\s1003\ProjectAPAD\test\client\flask-frontend\dist"
app = Flask(__name__, static_folder=static_folder_path)
CORS(app)

MONGO_URI = "mongodb+srv://apadTeam:APADisawesome%21@cluster.ig2qffr.mongodb.net/db?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client['db']

@app.route('/main')
def mainPage():
    return jsonify({'message': 'Backend is running', 'success': True}), 200

@app.route('/add_user', methods=['POST']) 
def add_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not all([username, password]):
        return jsonify({'message': 'Missing required fields', 'success': False}), 400
    hashed_password = generate_password_hash(password)

    try:
        success = addUser(client, username, hashed_password)
        if success:
            return jsonify({'message': 'User created successfully', 'success': True}), 201
        else:
            return jsonify({'message': 'User already exists!', 'success': False}), 409
    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

@app.route('/login', methods=['POST'])
def login_route():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')   

    response, status_code = login(client, username, password)
    return jsonify(response), status_code

@app.route('/create_hardware_set', methods=['POST'])
def create_hardware_set():
    data = request.get_json()
    hw_name = data.get('hwName')
    init_capacity = data.get('initCapacity')

    if not all([hw_name, init_capacity]):
        return jsonify({'message': 'Missing required fields', 'success': False}), 400

    try:
        # Check if the hardware set already exists
        existing_hw_set = queryHardwareSet(client, hw_name)
        if existing_hw_set:
            return jsonify({'message': 'Hardware set already exists', 'success': False}), 409

        # Create the new hardware set
        createHardwareSet(client, hw_name, init_capacity)
        return jsonify({'message': 'Hardware set created successfully', 'success': True}), 201

    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500
    
@app.route('/get_all_hw_names', methods=['POST'])
def get_all_hw_names():
    try:
        hw_names = getAllHwNames(client)
        return jsonify({'hw_names': hw_names, 'success': True}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

@app.route('/get_hw_info', methods=['POST'])
def get_hw_info():
    data = request.get_json()
    hw_name = data.get('hwName')

    if not hw_name:
        return jsonify({'message': 'Missing hwName', 'success': False}), 400

    try:
        hw_info = queryHardwareSet(client, hw_name)
        if hw_info:
            hw_info['_id'] = str(hw_info['_id'])  # Convert ObjectId to string for JSON serialization
            return jsonify({'hw_info': hw_info, 'success': True}), 200
        else:
            return jsonify({'message': 'Hardware set not found', 'success': False}), 404

    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

@app.route('/check_out', methods=['POST'])
def check_out():
    data = request.get_json()
    project_id = data.get('projectId')
    hw_name = data.get('hwName')
    qty = data.get('quantity')
    username = data.get('username')

    if not all([project_id, hw_name, qty, username]):
        return jsonify({'message': 'Missing required fields', 'success': False}), 400

    try:
        success = checkOutHW(client, project_id, hw_name, qty, username)
        if success:
            return jsonify({'message': 'Hardware checked out successfully', 'success': True}), 200
        else:
            return jsonify({'message': 'Unable to check out hardware', 'success': False}), 500

    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

@app.route('/check_in', methods=['POST'])
def check_in():
    data = request.get_json()
    project_id = data.get('projectId')
    hw_name = data.get('hwName')
    qty = data.get('quantity')
    username = data.get('username')

    if not all([project_id, hw_name, qty, username]):
        return jsonify({'message': 'Missing required fields', 'success': False}), 400

    try:
        success = checkInHW(client, project_id, hw_name, qty, username)
        if success:
            return jsonify({'message': 'Hardware checked in successfully', 'success': True}), 200
        else:
            return jsonify({'message': 'Unable to check in hardware', 'success': False}), 500

    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

@app.route('/inventory', methods=['GET'])
def check_inventory():
    return jsonify({})

@app.route('/get_user_projects_list', methods=['POST'])
def get_user_projects_list():
    data = request.get_json()
    username = data.get("username")

    if not username:
        return jsonify({"error": "Username is required"}), 400

    try:
        projects = getUserProjectsList(client, username)
        if projects is False:
            return jsonify({"error": "Unable to retrieve user projects"}), 500
        
        # If projects are a list of strings, do not try to access as dictionaries
        return jsonify({"projects": [{"project_id": project} for project in projects], "success": True}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/create_project', methods=['POST'])
def create_project():
    data = request.get_json()
    project_name = data.get('project_name')
    project_id = data.get('project_id')
    description = data.get('description')
    username = data.get('username')

    if not all([project_name, project_id, description, username]):
        return jsonify({'message': 'Missing required fields', 'success': False}), 400

    try:
        check = createProject(client, project_name, project_id, description, username) #Check is project is created
        if check:
            return jsonify({'message': 'Project created successfully', 'success': True}), 201
        
        return jsonify({'message': 'Project cannot be created successfully: Project ID already exists', 'success': False}), 201


    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

@app.route('/get_project_info', methods=['POST'])
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


@app.route('/join_project', methods=['POST'])
def join_project():
    data = request.get_json()
    username = data.get('username')
    project_id = data.get('project_id')

    if not all([username, project_id]):
        return jsonify({'message': 'Missing required fields', 'success': False}), 400

    try:
        success = joinUser(client, project_id, username)
        if success:
            return jsonify({'message': 'User added to project successfully', 'success': True}), 200
        else:
            return jsonify({'message': 'User already present', 'success': False}), 409
    except Exception as e:
        return jsonify({'message': str(e), 'success': False}), 500

        
if __name__ == '__main__':
    app.run(debug=True)
