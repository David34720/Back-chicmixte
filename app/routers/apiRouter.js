// src/routes/apiRouter.js

const express = require("express");
const router = express.Router();

// Import des contrôleurs API
const productController = require("../controllers/productController");
const attributeController = require("../controllers/attributeController");
const categoryController = require("../controllers/categoryController");

// Import des middlewares
const { catcher } = require("../middlewares/handlers");
const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");

/**
 * Routes pour les Produits
 */
router.get("/products", catcher(productController.getAllProducts));
router.get("/products/:id(\\d+)", catcher(productController.getProductById));
router.post(
	"/products",
	[auth, isAdmin],
	catcher(productController.createProduct),
);
router.put(
	"/products/:id(\\d+)",
	[auth, isAdmin],
	catcher(productController.updateProduct),
);
router.delete(
	"/products/:id(\\d+)",
	[auth, isAdmin],
	catcher(productController.deleteProduct),
);

/**
 * Routes pour les Attributs
 */
router.get("/attributes", catcher(attributeController.getAllAttributes));
router.get(
	"/attributes/:id(\\d+)",
	catcher(attributeController.getAttributeById),
);
router.post(
	"/attributes",
	[auth, isAdmin],
	catcher(attributeController.createAttribute),
);
router.put(
	"/attributes/:id(\\d+)",
	[auth, isAdmin],
	catcher(attributeController.updateAttribute),
);
router.delete(
	"/attributes/:id(\\d+)",
	[auth, isAdmin],
	catcher(attributeController.deleteAttribute),
);

/**
 * Routes pour les Catégories
 */
router.get("/categories", catcher(categoryController.getAllCategories));
router.get(
	"/categories/:id(\\d+)",
	catcher(categoryController.getCategoryById),
);
router.post(
	"/categories",

	catcher(categoryController.createCategory),
);
router.put(
	"/categories/:id(\\d+)",
	[auth, isAdmin],
	catcher(categoryController.updateCategory),
);
router.delete(
	"/categories/:id(\\d+)",
	[auth, isAdmin],
	catcher(categoryController.deleteCategory),
);

module.exports = router;
