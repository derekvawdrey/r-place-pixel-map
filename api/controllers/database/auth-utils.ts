const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const bcrypt = require('bcrypt');

const userCollection = client.collection("user");

/**
 * Takes a username and password and if correct returns a AuthToken
 * if not returns null
 * @param username 
 * @param password 
 * @returns 
 */
const auth = (username, password) : AuthToken | null => {
    const token = jwt.sign({ username: username }, config.secret_key, { expiresIn: '1m' });
    
    return new AuthToken();
}

/**
 * 
 * @param username 
 * @param password 
 * @returns 
 */
const register = (username, password) : AuthToken | null => {
    const token = jwt.sign({ username: username }, config.secret_key, { expiresIn: '1m' });
    // If already exists return 409
    return true;
}

/**
 * 
 * @param username 
 * @returns boolean
 */
function userExists(username) : boolean {
    return userCollection.findOne({ username: username });
}

/**
 * Given a password, encrypts it to store in database
 * @param password 
 * @returns 
 */
async function encryptPassword(password: String){
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}

module.exports = {auth, register};