# Import necessary libraries and modules
from pymongo import MongoClient

import hardwareDatabase
import usersDatabase

'''
Structure of Project entry:
Project = {
    'projectName': projectName,
    'projectId': projectId,
    'description': description,
    'hwSets': {HW1: 0, HW2: 10, ...},
    'users': [user1, user2, ...]
}
'''

# Function to query a project by its ID
def queryProject(client, projectId):
    db = client.db #grab client db
    projects = db.projects #grab projects sets from database
    
    myQuery = {"projectId":projectId} #query projects based on id
    queried = projects.find_one(myQuery) #query based on id

    return queried # returns query

# Function to create a new project
def createProject(client, projectName, projectId, description, username):
    # Create a new project in the database
    db = client.db  # grab client db
    projects = db.projects  # grab projects collection from the database

    # Default hardware sets to include in the new project
    hwSets = {
        "Hardware Set 1": 0,
        "Hardware Set 2": 0
    }

    # Empty users list
    users = []

    # Check if project exists
    projectCheck = queryProject(client, projectId)
    
    if projectCheck:
        return False  # return false if ID already exists in the system.
    
    # Create the document to insert
    projectToAdd = {
        'projectName': projectName,
        'projectId': projectId,
        'description': description,
        'hwSets': hwSets,  # Include default hardware sets
        'users': users
    }
    
    projects.insert_one(projectToAdd)  # insert into db
    
    result = joinUser(client, projectId, username)  # get the result of the user

    return result

def joinUser(client, projectId, username):
    db = client.db  # grab client db
    projects = db.projects  # grab projects sets from database
    
    project = queryProject(client, projectId)  # checks to make sure project exists

    if project:
        # Check if the user is already in the project
        if username in project['users']:
            return False  # user already in project

        # Add user to the project
        projects.update_one({'projectId': projectId}, {'$push': {'users': username}})
        
        result = usersDatabase.joinProject(client,username,projectId) #get result by adding to users side
        return result  # show that it succeeds

    return False  # show fail


# Function to update hardware usage in a project
def updateUsage(client, projectId, hwSetName, qty):
    # Update the usage of a hardware set in the specified project
    db = client.db  # grab client db
    projects = db.projects  # grab projects collection from the database

    project = queryProject(client, projectId)  # checks to make sure the project exists

    if project:
        # Increment the usage of the hardware set in the project's hwSets field
        update_result = projects.update_one(
            {'projectId': projectId}, 
            {'$inc': {f'hwSets.{hwSetName}': qty}}
        )

        # Check if the update was successful
        if update_result.modified_count > 0:
            return True  # successful update

    return False  # failed update
        

# Function to check out hardware for a project
def checkOutHW(client, projectId, hwSetName, qty):
    # Find the project and the hardware set
    project = queryProject(client, projectId)
    hw_set = hardwareDatabase.queryHardwareSet(client, hwSetName)

    # Check if hardware set exists and has enough availability
    if project and hw_set:
        if hwSetName in project['hwSets']:
            current_availability = hw_set['availability']
            if qty <= current_availability:
                # Update availability in the hardware set
                new_availability = current_availability - qty
                hardwareDatabase.updateAvailability(client, hwSetName, new_availability)

                # Update the project's hwSets field with the quantity
                updateUsage(client, projectId, hwSetName, qty)
                return True
    return False

# Function to check in hardware for a project
def checkInHW(client, projectId, hwSetName, qty):
    # Check in hardware for the specified project and update availability
    # Find the project and the hardware set
    project = queryProject(client, projectId)
    hw_set = hardwareDatabase.queryHardwareSet(client, hwSetName)

    # Check if project and hardware exists
    if project and hw_set:
        cap = hw_set['capacity']  # grab hw_set capacity
        availability = hw_set['availability']  # grab availability

        if qty > availability:  # if the quantity requested is more than the availability
            return False  # return error

        new_availability = availability + qty  # reduce availability by quantity checked in

        # Update availability in the database
        return hardwareDatabase.updateAvailability(client, hwSetName, new_availability)

    else:
        return False  # returns false if project or hardware set does not exist