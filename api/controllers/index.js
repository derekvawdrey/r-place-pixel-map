const VERSION = 'v1';
const API_PATH = `/api/${VERSION}`;
const mapRoutes = require("./map");
const userRoutes = require("./auth");

module.exports = app => {
    app.use(`${API_PATH}/map/:mapId`, mapRoutes.router);
    app.use(`${API_PATH}/user`, userRoutes.router)
}