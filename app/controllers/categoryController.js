// src/controllers/categoryController.js

const { Category } = require("../models");

const categoryController = {
	// Obtenir toutes les catégories
	getAllCategories: async (req, res) => {
		try {
			const categories = await Category.findAll({
				include: [{ model: Category, as: "subcategories" }], // Pour inclure les sous-catégories
			});
			res.json(categories);
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories :", error);
			res
				.status(500)
				.json({ message: "Erreur lors de la récupération des catégories." });
		}
	},

	// Obtenir une catégorie par ID
	getCategoryById: async (req, res) => {
		const { id } = req.params;
		try {
			const category = await Category.findByPk(id, {
				include: [{ model: Category, as: "parent" }],
			});
			if (category) {
				res.json(category);
			} else {
				res.status(404).json({ message: "Catégorie non trouvée." });
			}
		} catch (error) {
			console.error("Erreur lors de la récupération de la catégorie:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Créer une nouvelle catégorie
	createCategory: async (req, res) => {
		const { name, parent_id } = req.body;
		try {
			const newCategory = await Category.create({
				name,
				parent_id: parent_id || null,
			});
			res.status(201).json(newCategory);
		} catch (error) {
			console.error("Erreur lors de la création de la catégorie:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Mettre à jour une catégorie existante
	updateCategory: async (req, res) => {
		const { id } = req.params;
		const { name, parent_id } = req.body;
		try {
			const category = await Category.findByPk(id);
			if (category) {
				await category.update({
					name,
					parent_id: parent_id || null,
				});
				res.json(category);
			} else {
				res.status(404).json({ message: "Catégorie non trouvée." });
			}
		} catch (error) {
			console.error("Erreur lors de la mise à jour de la catégorie:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Supprimer une catégorie
	deleteCategory: async (req, res) => {
		const { id } = req.params;
		try {
			const category = await Category.findByPk(id);
			if (category) {
				await category.destroy();
				res.json({ message: "Catégorie supprimée avec succès." });
			} else {
				res.status(404).json({ message: "Catégorie non trouvée." });
			}
		} catch (error) {
			console.error("Erreur lors de la suppression de la catégorie:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},
};

module.exports = categoryController;
