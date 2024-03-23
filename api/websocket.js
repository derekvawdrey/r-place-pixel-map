const WebSocket = require('ws');

var connections = [];
var id = 0;

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ noServer: true });

    // Handle the protocol upgrade from HTTP to WebSocket
    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    wss.on('connection', (ws) => {
        const connection = { id: ++id, alive: true, ws: ws };
        console.log("Connection established!!!");
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
};

const getConnections = () => {
    return connections;
};

module.exports = { setupWebSocket, getConnections };
