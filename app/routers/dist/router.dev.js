"use strict";

var router = require("express").Router();

var _require = require("./adminRouter.js"),
    adminRouter = _require.adminRouter;

var _require2 = require("./authRouter.js"),
    authRouter = _require2.authRouter;

var _require3 = require("../controllers/homeController.js"),
    homeController = _require3.homeController;

var _require4 = require("../middlewares"),
    catcher = _require4.handlers.catcher;

var _require5 = require("../middlewares/auth.js"),
    auth = _require5.auth;

var _require6 = require("../middlewares/isAdmin.js"),
    isAdmin = _require6.isAdmin;

router.get("/", catcher(homeController.index));
router.use(auth, adminRouter);
router.use(auth, authRouter); // * \\d+ est une regex qui va valider le type du paramètre :id, ce sera un nombre entier positif ou le router nous donnera un 404
// router.get('/level/:id(\\d+)', homeController.getOneLevel);

module.exports = router;