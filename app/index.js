const path = require("node:path");
require("dotenv").config();
const express = require("express");
const http = require("node:http"); // Importation du module HTTP
const app = express();
const server = http.createServer(app); // Créez un serveur HTTP avec Express
const cors = require("cors");
// Configuration de CORS pour autoriser les requêtes de localhost:5173
app.use(
	cors({
		origin: "http://localhost:5173", // Permet uniquement les requêtes de cette origine
		credentials: true, // Nécessaire si tu envoies des cookies/sessions avec les requêtes
	}),
);
// Import des routeurs
const frontendRouter = require("./routers/router");
const apiRouter = require("./routers/apiRouter");

const {
	handlers: { notfound, fatal },
} = require("./middlewares");

const initSession = require("./middlewares/initSession");
const { initUserSession } = require("./middlewares/initUserSession");
const router = require("./routers/router");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

// Définir le chemin des vues
app.set("views", path.join(__dirname, "views"));

// Servir les fichiers statiques depuis "public/assets"
app.use(express.static(path.join(__dirname, "../assets")));

// Middleware pour parser le JSON
app.use(express.json({ limit: "2mb" }));

// Pour analyser les requêtes POST avec des données URL-encodées
app.use(express.urlencoded({ extended: false }));

// Initialiser la session et authentification
app.use(initSession);
app.use(initUserSession);

// Middleware pour rendre `originalAdmin` accessible dans toutes les vues
app.use((req, res, next) => {
	res.locals.originalAdmin = req.session.originalAdmin;
	next();
});

// Utiliser le routeur frontend principal
app.use(frontendRouter);

// Utiliser le routeur API sous le préfixe /api
app.use("/api", apiRouter);

// 404 est branché
app.use(notfound);

// Dernier middleware de la chaine : celui qui gère les erreurs
app.use(fatal);

// Démarrer le serveur HTTP et WebSocket
server.listen(port, () => {
	console.log(`${process.env.BASE_URL}:${port}`);
});

// Importer et démarrer le serveur WebSocket
require("./server/websocket-server")(server);
