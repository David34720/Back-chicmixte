const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connecté.');

        ws.isAlive = true;

        ws.on('pong', () => {
            ws.isAlive = true;
        });

        ws.on('close', () => {
            console.log('Client déconnecté.');
        });

        ws.on('message', (message) => {
            console.log(`Message reçu: ${message}`);
            ws.send('Message reçu par le serveur');
        });

        ws.on('error', (error) => {
            console.error('WebSocket Error:', error);
        });
    });

    // Vérifier régulièrement si les connexions sont actives
    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (!ws.isAlive) return ws.terminate();

            ws.isAlive = false;
            ws.ping();
        });
    }, 30000);

    wss.on('close', () => {
        clearInterval(interval);
    });
};
