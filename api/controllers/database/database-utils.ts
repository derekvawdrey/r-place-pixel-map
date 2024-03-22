const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const bcrypt = require('bcrypt');

const userCollection = client.collection("user");

/**
 * Takes a username and password and if correct returns a User model, if not returns null
 * @param username 
 * @param password 
 * @returns 
 */
const auth = (username, password) : User => {
    const token = jwt.sign({ username: username }, config.secret_key, { expiresIn: '1m' });
    
    return new User(username, token);
}

/**
 * 
 * @param username 
 * @param password 
 * @returns 
 */
const register = (username, password) => {
    const token = jwt.sign({ username: username }, config.secret_key, { expiresIn: '1m' });
    // If already exists return 409
    return new User(username, token);
}

const updateJwtToken = (user:User) => {
    
}

/**
 * 
 * @param username 
 * @returns boolean
 */
function userExists(username) : boolean {
    return userCollection.findOne({ username: username });
}

module.exports = {auth, register};