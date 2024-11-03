const authRouter = require("express").Router();
const { registerController } = require("../controllers/registerController.js");
const { sessionController } = require("../controllers/sessionController.js");

const { auth } = require("../middlewares/auth.js");
const {
	handlers: { catcher },
} = require("../middlewares");

// afficher le form création de compte
authRouter.get("/register", auth, catcher(registerController.index));
authRouter.post("/register", catcher(registerController.store));
// afficher le form connexion à son compte
authRouter.get("/login", catcher(sessionController.index));
authRouter.post("/login", catcher(sessionController.store));
//
authRouter.get("/logout", catcher(sessionController.destroy));

// gestion des routes de l'interface utilisateur "front"
authRouter.post("/api/login", catcher(sessionController.apiStore));

module.exports = { authRouter };
