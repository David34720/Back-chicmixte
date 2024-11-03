"use strict";

var path = require("node:path");

require("dotenv").config();

var express = require("express");

var http = require("node:http"); // Importation du module HTTP


var app = express();
var server = http.createServer(app); // Créez un serveur HTTP avec Express

var cors = require("cors"); // Configuration de CORS pour autoriser les requêtes de localhost:5173


app.use(cors({
  origin: "http://localhost:5173",
  // Permet uniquement les requêtes de cette origine
  credentials: true // Nécessaire si tu envoies des cookies/sessions avec les requêtes

}));

var _require = require("./middlewares"),
    _require$handlers = _require.handlers,
    notfound = _require$handlers.notfound,
    fatal = _require$handlers.fatal;

var initSession = require("./middlewares/initSession");

var _require2 = require("./middlewares/initUserSession"),
    initUserSession = _require2.initUserSession;

var router = require("./routers/router");

var port = process.env.PORT || 3000;
app.set("view engine", "ejs"); // Définir le chemin des vues

app.set("views", path.join(__dirname, "views")); // Servir les fichiers statiques depuis "public/assets"

app.use(express["static"](path.join(__dirname, "../assets"))); // Middleware pour parser le JSON

app.use(express.json({
  limit: "2mb"
})); // Pour analyser les requêtes POST avec des données URL-encodées

app.use(express.urlencoded({
  extended: false
})); // Initialiser la session et authentification

app.use(initSession);
app.use(initUserSession); // Middleware pour rendre `originalAdmin` accessible dans toutes les vues

app.use(function (req, res, next) {
  res.locals.originalAdmin = req.session.originalAdmin;
  next();
}); // Utiliser le routeur principal

app.use(router); // 404 est branché

app.use(notfound); // Dernier middleware de la chaine : celui qui gère les erreurs

app.use(fatal); // Démarrer le serveur HTTP et WebSocket

server.listen(port, function () {
  console.log("".concat(process.env.BASE_URL, ":").concat(port));
}); // Importer et démarrer le serveur WebSocket

require("./server/websocket-server")(server);