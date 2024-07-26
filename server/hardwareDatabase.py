# Import necessary libraries and modules
from pymongo import MongoClient

'''
Structure of Hardware Set entry:
HardwareSet = {
    'hwName': hwSetName,
    'capacity': initCapacity,
    'availability': initCapacity
}
'''

# Function to create a new hardware set
def createHardwareSet(client, hwSetName, initCapacity):
    # Create a new hardware set in the database
    pass

# Function to query a hardware set by its name
def queryHardwareSet(client, hwSetName):

    db = client.db #grab client db
    hwSets = db.hardwareSets #grab hardware sets from db

    myQuery = {"hwName":hwSetName} #query hardware sets that match the name
    queried = hwSets.find_one(myQuery) #query based on name

    return queried # returns query

# Function to update the availability of a hardware set
def updateAvailability(client, hwSetName, newAvailability):
    # Update the availability of an existing hardware set
    pass

# Function to request space from a hardware set
def requestSpace(client, hwSetName, amount):
    # Request a certain amount of hardware and update availability
    pass

# Function to get all hardware set names
def getAllHwNames(client):
    # Get and return a list of all hardware set names
    pass

