'use strict'

const http = require('http');
const app = require('./api/app');

const appPort = process.env.Port || 3000;
app.set('port', appPort);

http.createServer(app).listen(
    appPort,
    () => console.log(`Node app running at localhost:${appPort}`)
    );