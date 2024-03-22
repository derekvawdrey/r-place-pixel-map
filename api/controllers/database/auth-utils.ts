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
const auth = async (username, password) : Promise<AuthToken | null> => {
    //const token = jwt.sign({ username: username }, config.secret_key, { expiresIn: '1m' });
    const user = await getUser(username);
    if(user){
        return new AuthToken();
    }
    return null;
    
}

/**
 * 
 * @param username 
 * @param password 
 * @returns 
 */
const register = async (username, password) : Promise<AuthToken | null> => {
    const token = jwt.sign({ username: username }, config.secret_key, { expiresIn: '1m' });
    // If already exists return 409
    return true;
}

/**
 * 
 * @param username 
 * @returns User
 */
function getUser(username) : User | null {
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