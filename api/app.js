const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

require("./controllers")(app);






module.exports = app;