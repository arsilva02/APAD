# Import necessary libraries and modules
from pymongo import MongoClient

import hardwareDB

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
def createProject(client, projectName, projectId, description):
    # Create a new project in the database
    db = client.db #grab client db
    projects = db.projects #grab projects sets from database
    
    #empty hwSets dic
    hwSets = {}
    
    #empty users list
    users = []
    
    #create doc
    projectToAdd = {'projectName':projectName,
               'projectId': projectId,
               'description':description,
               'hwSets':hwSets,
               'users':users}
    
    projects.insert_one(projectToAdd) #insert into db

# Function to add a user to a project
def addUser(client, projectId, userId):
    # Create a new project in the database
    db = client.db #grab client db
    projects = db.projects #grab projects sets from database
    
    project = queryProject(client,projectId) #checks to make sure exists

    if project:
        projects.update_one({'projectId': projectId}, {'$push': {'users': userId}}) #pushes user
        return True #show that succeeds
    
    return False #show fail





# Function to update hardware usage in a project
def updateUsage(client, projectId, hwSetName):
    # Update the usage of a hardware set in the specified project
    pass

# Function to check out hardware for a project
def checkOutHW(client, projectId, hwSetName, qty, userId):
    # Check out hardware for the specified project and update availability
    pass

# Function to check in hardware for a project
def checkInHW(client, projectId, hwSetName, qty, userId):
    # Check in hardware for the specified project and update availability
    pass

