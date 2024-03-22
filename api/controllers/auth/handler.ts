import { AuthToken } from "../database/authToken";
import { authUser, registerUser } from "../database/authUtils"

const jwt = require('jsonwebtoken');
const SECRET_KEY = "SUSSYBAKA";

/**
 * If the user exists, and is autheticated
 * @param res 
 * @param authToken 
 * @returns boolean
 */
const setAuthCookie = (res, authToken:AuthToken | null) : boolean=> {
  if(authToken){
    res.cookie('token', authToken.token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
    return true;
  }
  return false;
}

/**
 * Provided with a username and password, the user will be authenticated and given a JWT
 * @param {*} req 
 * @param {*} res 
 */
const authenticate = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
      const authToken = await authUser(username, password);
      const authenticated = setAuthCookie(res, authToken);
      if (authenticated) {
          res.status(200).send("Authentication successful.");
      } else {
          res.status(401).send("Authentication failed.");
      }
  } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).send("Internal server error.");
  }
};

/**
 * Temporarily registers user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const register = (req, res) => {
    
    res.json({ message: 'User registered successfully', token:token });
};

module.exports = {authenticate, register};