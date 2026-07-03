// server.js
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map(); // Tracks active connections by username

console.log("🚀 Signaling server running on ws://localhost:8080");

wss.on('connection', (ws) => {
    let currentUsername = null;

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            switch (data.type) {
                case 'register':
                    currentUsername = data.username;
                    clients.set(currentUsername, ws);
                    console.log(`👤 User registered: ${currentUsername}`);
                    broadcastUserList();
                    break;

                case 'relay':
                    // Send connection data (offer/answer/ice-candidate) to the target peer
                    const targetWs = clients.get(data.target);
                    if (targetWs) {
                        targetWs.send(JSON.stringify({
                            type: 'relay',
                            sender: currentUsername,
                            payload: data.payload
                        }));
                    }
                    break;
            }
        } catch (err) {
            console.error("Error processing message:", err);
        }
    });

    ws.on('close', () => {
        if (currentUsername) {
            clients.delete(currentUsername);
            console.log(`❌ User disconnected: ${currentUsername}`);
            broadcastUserList();
        }
    });
});

function broadcastUserList() {
    const userList = Array.from(clients.keys());
    const message = JSON.stringify({ type: 'user-list', users: userList });
    for (const ws of clients.values()) {
        ws.send(message);
    }
}
