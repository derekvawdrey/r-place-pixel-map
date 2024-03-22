import { AuthToken } from "./authToken";

const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const bcrypt = require('bcrypt');

const userCollection = client.db("auth").collection("user");

/**
 * Takes a username and password and if correct returns a AuthToken
 * if not returns null
 * @param username 
 * @param password 
 * @returns Promise<AuthToken | null>
 */
const authUser = async (username, password) : Promise<AuthToken | null> => {
    try {
        const user = await getUser(username);
        if (user && user.password) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch && user.authToken && user.authToken.token) {
                return new AuthToken(user.authToken.token);
            }
        }
        return null;
    } catch (error) {
        console.error("Error during authentication:", error);
        throw new Error("Internal server error.");
    }
};

/**
 * 
 * @param username 
 * @param password 
 * @returns 
 */
const registerUser = async (username, password) : Promise<AuthToken | null> => {
    const user = await getUser(username);
    if(user){

    }

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

function createUser() {

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

module.exports = {authUser, registerUser};