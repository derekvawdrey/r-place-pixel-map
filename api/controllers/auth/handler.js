const jwt = require('jsonwebtoken');

/**
 * Provided with a username and password, the user will be authenticated and given a JWT
 * @param {*} req 
 * @param {*} res 
 */
const authenticate = (req, res) => {
    const username = 'demoUser';
    const password = 'demoPassword';

    if (req.body.username === username && req.body.password === password) {
        const token = jwt.sign({ username: req.body.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = {authenticate};