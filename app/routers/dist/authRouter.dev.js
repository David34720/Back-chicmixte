"use strict";

var authRouter = require("express").Router();

var _require = require("../controllers/registerController.js"),
    registerController = _require.registerController;

var _require2 = require("../controllers/sessionController.js"),
    sessionController = _require2.sessionController;

var _require3 = require("../middlewares/auth.js"),
    auth = _require3.auth;

var _require4 = require("../middlewares"),
    catcher = _require4.handlers.catcher; // afficher le form création de compte


authRouter.get("/register", auth, catcher(registerController.index));
authRouter.post("/register", catcher(registerController.store)); // afficher le form connexion à son compte

authRouter.get("/login", catcher(sessionController.index));
authRouter.post("/login", catcher(sessionController.store)); //

authRouter.get("/logout", catcher(sessionController.destroy)); // gestion des routes de l'interface utilisateur "front"

authRouter.post("/api/login", catcher(sessionController.apiStore));
module.exports = {
  authRouter: authRouter
};