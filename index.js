'use strict';

const http = require('http');
const app = require('./api/app');
const { setupWebSocket } = require('./api/websocket');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Node app running at localhost:${port}`));

// Setup WebSocket
setupWebSocket(server);
