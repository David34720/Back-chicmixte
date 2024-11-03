let socket;
let reconnectInterval = 3000; // 3 secondes

function connectWebSocket() {
    socket = new WebSocket(`ws://${window.location.host}`);

    socket.onopen = function() {
        console.log('Connexion WebSocket établie');
        socket.send('Hello serveur !');
    };

    socket.onmessage = function(event) {
        console.log('Message reçu :', event.data);
    };

    socket.onclose = function() {
        console.log('Connexion WebSocket fermée, tentative de reconnexion...');
        setTimeout(connectWebSocket, reconnectInterval); // Tentative de reconnexion après 3 secondes
    };

    socket.onerror = function(error) {
        console.error('WebSocket Error: ', error);
        socket.close(); // Ferme la connexion en cas d'erreur
    };
}

// Démarrer la connexion WebSocket
connectWebSocket();
