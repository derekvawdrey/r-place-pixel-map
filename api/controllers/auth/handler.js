const {AuthToken} = require("../../database/authToken");
const { authUser, registerUser, getUserByToken } = require("../../database/authUtils");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "SUSSYBAKA";

/**
 * If the user exists, and is autheticated
 * @param res 
 * @param authToken 
 * @returns boolean
 */
const setAuthCookie = (res, authToken) => {
  if (authToken) {
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
      res.status(401).send("incorrect Username and password combination");
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
const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const authToken = await registerUser(username, password);
    const authenticated = setAuthCookie(res, authToken);
    if (authenticated) {
      res.status(200).send("Registration successful.");
    } else {
      res.status(401).send("That username already exists.");
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
const getUser = async (req, res) => {
  const authToken = req.cookies['token'];
  if(authToken){
    const user = await getUserByToken(authToken);
    if (user) {
      console.log(user.username);
      console.log(user);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
};

module.exports = { authenticate, register, getUser };