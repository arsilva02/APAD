# Import necessary libraries and modules
from pymongo import MongoClient

'''
Structure of User entry:
User = {
    'username': username,
    'userId': userId,
    'password': password,
    'projects': [project1_ID, project2_ID, ...]
}
'''
def get_users(client):
    return client.db.users


# Function to add a new user
def addUser(client, username, password):
    # Add a new user to the database
    try:
        db = client.db
        users = db.users

        #Ensure the userId is unique
        if users.find_one({"username": username}):
            raise Exception("User with this ID already exists.")

        #Hash the password before storing
        user_dict = {
            "username": username,
            "password": password,
            "projects": []
        }
        users.insert_one(user_dict)
        return True
    except Exception as username:
        print("Error adding user: {username}")
        return False


# Helper function to query a user by username and userId
def __queryUser(client, username):
    # Query and return a user from the database
    try:
        user_dict = get_users(client)
        user = user_dict.find_one({"username": username})
        if not user:
            raise Exception("User not found.")
        return user
    except Exception as username:
        print(f"Error quering user: {username}")


# Function to log in a user
def login(client, username, password):
    # Authenticate a user and return login status
    try:
        users_dict = get_users(client)
        users = users_dict.find_one({"username": username})
        passw = users_dict.find_one({"password": password})
        if not users and not passw:
            return False
        return True
    except Exception as username:
        print(f"Error logging in: {username}")
        return False

# Function to add a user to a project
def joinProject(client, username, projectId):
    # Add a user to a specified project
    try:
        users_dict = get_users(client)
        result = users_dict.update_one(
            {"username": username},
            {"$addToSet": {"projects": projectId}}
        )
        if result.modified_count == 0:
            raise Exception("Failed to join project.")
        return True
    except Exception as projectId:
        print(f"Error joining project: {projectId}")
        return False


# Function to get the list of projects for a user
def getUserProjectsList(client, username):
    # Get and return the list of projects a user is part of
    try:
        user = __queryUser(client, username)
        if not user:
            raise Exception("User not found.")
        return user.get("projects", [])
    except Exception as username:
        print(f"Error retrieving user projects list: {username}")
        return False

