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
    db = client.db #connect to db
    hwSets = db.hardwareSets #grab hw sets

    #create doc
    hwToAdd = {'hwName':hwSetName,
               'capacity': initCapacity,
               'availability':initCapacity}
    
    hwSets.insert_one(hwToAdd) #insert into db

# Function to query a hardware set by its name
def queryHardwareSet(client, hwSetName):

    db = client.db #grab client db
    hwSets = db.hardwareSets #grab hardware sets from db

    myQuery = {"hwName":hwSetName} #query hardware sets that match the name
    queried = hwSets.find_one(myQuery) #query based on name

    return queried # returns query

# Function to update the availability of a hardware set
def updateAvailability(client, hwSetName, newAvailability):
    db = client.db #grab client db
    hwSets = db.hardwareSets #grab hw sets from db
    
    #hw_set = hwSets.find_one({'hwName':hwSetName}) #finds the set you want to update
    
    hwSets.update_one({'hwName':hwSetName}, {'$set': {'availability':newAvailability}})
    #Sets based on the name, then sets based on the new availability

# Function to request space from a hardware set
def requestSpace(client, hwSetName, amount):
    # Request a certain amount of hardware and update availability
    db = client.db #grab client db
    hwSets = db.hardwareSets #grab hw sets from db
    
    hw_set = hwSets.find_one({'hwName':hwSetName}) #finds the set you want to request from
    
    if hw_set and amount <= hw_set['availability']: #checks if hw set exists and if amount can be requeseted
        
        newAvailability = hw_set - amount #the new availability
        
        updateAvailability(client,hwSetName,newAvailability) #call update availability function

# Function to get all hardware set names
def getAllHwNames(client):
    # Get and return a list of all hardware set names
    pass

