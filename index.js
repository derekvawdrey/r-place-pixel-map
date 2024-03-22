'use strict'

const http = require('http');
const app = require('./api/app');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.set('port', port);

http.createServer(app).listen(
    port,
    () => console.log(`Node app running at localhost:${port}`)
    );