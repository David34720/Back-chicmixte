const router = require("express").Router();

const { adminRouter } = require("./adminRouter.js");
const { authRouter } = require("./authRouter.js");
const { homeController } = require("../controllers/homeController.js");

const {
	handlers: { catcher },
} = require("../middlewares");
const { auth } = require("../middlewares/auth.js");
const { isAdmin } = require("../middlewares/isAdmin.js");

router.get("/", catcher(homeController.index));

router.use(auth, adminRouter);
router.use(auth, authRouter);

// * \\d+ est une regex qui va valider le type du paramètre :id, ce sera un nombre entier positif ou le router nous donnera un 404
// router.get('/level/:id(\\d+)', homeController.getOneLevel);

module.exports = router;
