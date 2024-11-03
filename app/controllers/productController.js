// src/controllers/productController.js

const { Product, Category, Variant } = require("../models");

const productController = {
	// Obtenir tous les produits
	getAllProducts: async (req, res) => {
		try {
			const products = await Product.findAll({
				include: [
					{ model: Category, as: "category" },
					{ model: Variant, as: "variants" },
				],
			});
			res.json(products);
		} catch (error) {
			console.error("Erreur lors de la récupération des produits:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Obtenir un produit par ID
	getProductById: async (req, res) => {
		const { id } = req.params;
		try {
			const product = await Product.findByPk(id, {
				include: [
					{ model: Category, as: "category" },
					{ model: Variant, as: "variants" },
				],
			});
			if (product) {
				res.json(product);
			} else {
				res.status(404).json({ message: "Produit non trouvé." });
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du produit:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Créer un nouveau produit
	createProduct: async (req, res) => {
		const { name, description, base_price, category_id, variants } = req.body;
		try {
			const newProduct = await Product.create(
				{
					name,
					description,
					base_price,
					category_id,
					variants, // Assurez-vous que l'association avec les variantes est correctement définie
				},
				{
					include: [{ model: Variant, as: "variants" }],
				},
			);
			res.status(201).json(newProduct);
		} catch (error) {
			console.error("Erreur lors de la création du produit:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Mettre à jour un produit existant
	updateProduct: async (req, res) => {
		const { id } = req.params;
		const { name, description, base_price, category_id, variants } = req.body;
		try {
			const product = await Product.findByPk(id);
			if (product) {
				await product.update({
					name,
					description,
					base_price,
					category_id,
				});

				// Gérer les variantes
				if (variants && Array.isArray(variants)) {
					// Supprimer les variantes existantes
					await Variant.destroy({ where: { product_id: id } });

					// Ajouter les nouvelles variantes
					await Variant.bulkCreate(
						variants.map((variant) => ({
							price: variant.price,
							stock: variant.stock,
							product_id: id,
							attributes: variant.attributes, // Assurez-vous que le modèle Variant supporte les attributs
						})),
					);
				}

				const updatedProduct = await Product.findByPk(id, {
					include: [
						{ model: Category, as: "category" },
						{ model: Variant, as: "variants" },
					],
				});

				res.json(updatedProduct);
			} else {
				res.status(404).json({ message: "Produit non trouvé." });
			}
		} catch (error) {
			console.error("Erreur lors de la mise à jour du produit:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Supprimer un produit
	deleteProduct: async (req, res) => {
		const { id } = req.params;
		try {
			const product = await Product.findByPk(id);
			if (product) {
				await product.destroy();
				res.json({ message: "Produit supprimé avec succès." });
			} else {
				res.status(404).json({ message: "Produit non trouvé." });
			}
		} catch (error) {
			console.error("Erreur lors de la suppression du produit:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},
};

module.exports = productController;
