// src/routes/router.js

const express = require("express");
const router = express.Router();

// Import des routeurs frontend et existants
const { adminRouter } = require("./adminRouter.js");
const { authRouter } = require("./authRouter.js");

// Import des middlewares
const { catcher } = require("../middlewares/handlers");
const { auth } = require("../middlewares/auth.js");
const { isAdmin } = require("../middlewares/isAdmin.js");

// Route de base frontend (EJS)
router.get("/", catcher(require("../controllers/homeController").index));

// Routes protégées frontend (admin)
router.use("/admin", [auth, isAdmin], adminRouter);

// Routes d'authentification frontend
router.use("/auth", authRouter);

// Export du routeur frontend principal
module.exports = router;

// * \\d+ est une regex qui va valider le type du paramètre :id, ce sera un nombre entier positif ou le router nous donnera un 404
// router.get('/level/:id(\\d+)', homeController.getOneLevel);
