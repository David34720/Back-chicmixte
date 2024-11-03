// src/controllers/attributeController.js

const { Attribute, AttributeValue } = require("../models");

const attributeController = {
	// Obtenir tous les attributs avec leurs valeurs
	getAllAttributes: async (req, res) => {
		try {
			const attributes = await Attribute.findAll({
				include: [{ model: AttributeValue, as: "values" }],
			});
			res.json(attributes);
		} catch (error) {
			console.error("Erreur lors de la récupération des attributs:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Obtenir un attribut par ID avec ses valeurs
	getAttributeById: async (req, res) => {
		const { id } = req.params;
		try {
			const attribute = await Attribute.findByPk(id, {
				include: [{ model: AttributeValue, as: "values" }],
			});
			if (attribute) {
				res.json(attribute);
			} else {
				res.status(404).json({ message: "Attribut non trouvé." });
			}
		} catch (error) {
			console.error("Erreur lors de la récupération de l'attribut:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Créer un nouvel attribut avec ses valeurs
	createAttribute: async (req, res) => {
		const { name, values } = req.body;
		try {
			const newAttribute = await Attribute.create(
				{
					name,
					values: values.map((val) => ({ value: val })),
				},
				{
					include: [{ model: AttributeValue, as: "values" }],
				},
			);
			res.status(201).json(newAttribute);
		} catch (error) {
			console.error("Erreur lors de la création de l'attribut:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Mettre à jour un attribut existant et ses valeurs
	updateAttribute: async (req, res) => {
		const { id } = req.params;
		const { name, values } = req.body;
		try {
			const attribute = await Attribute.findByPk(id, {
				include: [{ model: AttributeValue, as: "values" }],
			});
			if (attribute) {
				await attribute.update({ name });

				// Mettre à jour les valeurs d'attribut
				if (values && Array.isArray(values)) {
					// Supprimer les anciennes valeurs
					await AttributeValue.destroy({ where: { attribute_id: id } });

					// Ajouter les nouvelles valeurs
					await AttributeValue.bulkCreate(
						values.map((val) => ({
							value: val,
							attribute_id: id,
						})),
					);
				}

				const updatedAttribute = await Attribute.findByPk(id, {
					include: [{ model: AttributeValue, as: "values" }],
				});

				res.json(updatedAttribute);
			} else {
				res.status(404).json({ message: "Attribut non trouvé." });
			}
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'attribut:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},

	// Supprimer un attribut et ses valeurs
	deleteAttribute: async (req, res) => {
		const { id } = req.params;
		try {
			const attribute = await Attribute.findByPk(id);
			if (attribute) {
				// Supprimer les valeurs associées
				await AttributeValue.destroy({ where: { attribute_id: id } });

				// Supprimer l'attribut
				await attribute.destroy();
				res.json({ message: "Attribut supprimé avec succès." });
			} else {
				res.status(404).json({ message: "Attribut non trouvé." });
			}
		} catch (error) {
			console.error("Erreur lors de la suppression de l'attribut:", error);
			res.status(500).json({ message: "Erreur interne du serveur." });
		}
	},
};

module.exports = attributeController;
