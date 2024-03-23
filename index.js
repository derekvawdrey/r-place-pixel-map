'use strict';

const http = require('http');
const WebSocket = require('ws'); // Add WebSocket import
const app = require('./api/app');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Node app running at localhost:${port}`));

const wss = new WebSocket.Server({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});

var connections = [];
var id = 0;
wss.on('connection', (ws) => {
    const connection = { id: ++id, alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
        connections.forEach((c) => {
            if (c.id !== connection.id) {
                c.ws.send(data);
            }
        });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
        const pos = connections.findIndex((o, i) => o.id === connection.id);

        if (pos >= 0) {
            connections.splice(pos, 1);
        }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
        connection.alive = true;
    });
});

setInterval(() => {
    connections.forEach((c) => {
        // Kill any connection that didn't respond to the ping last time
        if (!c.alive) {
            c.ws.terminate();
        } else {
            c.alive = false;
            c.ws.ping();
        }
    });
}, 10000);

function getConnections(){
    return connections;
}

module.exports = { getConnections };