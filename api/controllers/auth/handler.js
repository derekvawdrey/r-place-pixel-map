const jwt = require('jsonwebtoken');


const SECRET_KEY = "SUSSYBAKA";

let combos = {};
combos["demoUser"] = "demoPassword";


/**
 * Provided with a username and password, the user will be authenticated and given a JWT
 * @param {*} req 
 * @param {*} res 
 */
const authenticate = (req, res) => {
    let password = "";
    if(combos[req.body.username]){
        password = combos[req.body.username];
    }else{
        res.status(401).json({ error: 'Unauthorized' });
    }

    if (password === password) {
        const token = jwt.sign({ username: req.body.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

/**
 * Temporarily registers user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const register = (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }
  
    // Check if the username is already taken
    if (combos[username]) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }
  
    // Store the new user
    combos[username] = password;
    const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'User registered successfully', token:token });
  };

module.exports = {authenticate, register};