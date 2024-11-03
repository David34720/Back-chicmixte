const itemRouter = require("express").Router();
const { itemController } = require("../controllers/itemController.js");
const {
	handlers: { catcher },
} = require("../middlewares/index.js");
const upload = require("../middlewares/multer.js");

itemRouter.post(
	"/create",
	upload.single("img"),
	catcher(itemController.create),
);

itemRouter.post(
	"/update/:id(\\d+)",
	upload.single("img"),
	catcher(itemController.update),
);

module.exports = { itemRouter };
