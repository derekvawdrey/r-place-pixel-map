
const VERSION = 'v1';
const API_PATH = `/api/${VERSION}`;

module.exports = app => {
    app.use(`${API_PATH}/map`, require("./map").routes);
    
}