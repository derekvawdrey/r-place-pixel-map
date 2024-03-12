'use strict'

const http = require('http');
const app = require('./api/app');

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.set('port', port);

http.createServer(app).listen(
    appPort,
    () => console.log(`Node app running at localhost:${appPort}`)
    );