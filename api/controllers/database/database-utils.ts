const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const auth = (username, password) : User => {

    const token = jwt.sign({ username: username }, config.secret_key, { expiresIn: '1m' });

    return new User(username, token);
}

const register = (username, password) => {
    const token = jwt.sign({ username: username }, config.secret_key, { expiresIn: '1m' });

    return new User(username, token);
}
module.exports = {auth, register};