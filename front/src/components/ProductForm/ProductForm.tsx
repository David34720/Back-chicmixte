import type React from "react";
import { useEffect, useState, type FormEvent } from "react";
import AttributeSelector from "../AttributeSelector/AttributeSelector";

interface AttributeValue {
	id: number;
	value: string;
}

interface Attribute {
	id: number;
	name: string;
	values: AttributeValue[];
}

interface VariantAttributes {
	[attributeId: number]: number; // Mapping attribute ID to attribute value ID
}

interface Variant {
	id?: number; // Optionnel si c'est une nouvelle variante
	price: number;
	stock: number;
	attributes: VariantAttributes;
}

interface Category {
	id: number;
	name: string;
	parent_id: number | null;
}

interface Product {
	id: number;
	name: string;
	description: string;
	base_price: number;
	category_id: number | null;
	variants: Variant[];
}

interface ProductFormProps {
	product?: Product;
	onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
	const [name, setName] = useState<string>(product ? product.name : "");
	const [description, setDescription] = useState<string>(
		product ? product.description : "",
	);
	const [basePrice, setBasePrice] = useState<string>(
		product ? product.base_price.toString() : "",
	);
	const [categoryId, setCategoryId] = useState<number | "">(
		product && product.category_id !== null ? product.category_id : "",
	);
	const [categories, setCategories] = useState<Category[]>([]);
	const [attributes, setAttributes] = useState<Attribute[]>([]);
	const [variants, setVariants] = useState<Variant[]>(
		product ? product.variants : [],
	);

	// Fonction pour récupérer les catégories depuis l'API
	const fetchCategories = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/categories`,
			);
			if (!response.ok) {
				throw new Error("Erreur lors de la récupération des catégories.");
			}
			const data: Category[] = await response.json();
			setCategories(data);
		} catch (error) {
			console.error("Erreur lors de la récupération des catégories :", error);
			alert("Une erreur est survenue lors de la récupération des catégories.");
		}
	};

	// Fonction pour récupérer les attributs depuis l'API
	const fetchAttributes = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/attributes`,
			);
			if (!response.ok) {
				throw new Error("Erreur lors de la récupération des attributs.");
			}
			const data: Attribute[] = await response.json();
			setAttributes(data);
		} catch (error) {
			console.error("Erreur lors de la récupération des attributs :", error);
			alert("Une erreur est survenue lors de la récupération des attributs.");
		}
	};

	useEffect(() => {
		fetchCategories();
		fetchAttributes();
	}, []);

	// Gestion de la soumission du formulaire
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const payload = {
			name,
			description,
			base_price: Number.parseFloat(basePrice),
			category_id: categoryId === "" ? null : categoryId,
			variants,
		};

		try {
			const response = await fetch(
				product
					? `${import.meta.env.VITE_API_URL}/products/${product.id}`
					: `${import.meta.env.VITE_API_URL}/products`,
				{
					method: product ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);

			if (!response.ok) {
				throw new Error("Erreur lors de la sauvegarde du produit.");
			}

			onSubmit();
		} catch (error: any) {
			console.error(error);
			alert(error.message);
		}
	};

	// Gestion de l'ajout d'une nouvelle variante
	const handleAddVariant = () => {
		setVariants([
			...variants,
			{ price: Number.parseFloat(basePrice) || 0, stock: 0, attributes: {} },
		]);
	};

	// Gestion de la modification d'une variante existante
	const handleVariantChange = (
		index: number,
		field: keyof Variant,
		value: any,
	) => {
		const updatedVariants = [...variants];
		updatedVariants[index] = { ...updatedVariants[index], [field]: value };
		setVariants(updatedVariants);
	};

	// Gestion de la suppression d'une variante
	const handleRemoveVariant = (index: number) => {
		const updatedVariants = [...variants];
		updatedVariants.splice(index, 1);
		setVariants(updatedVariants);
	};

	// Gestion des attributs pour une variante spécifique
	const handleAttributeChange = (
		variantIndex: number,
		attributeId: number,
		value: number,
	) => {
		const updatedVariants = [...variants];
		updatedVariants[variantIndex].attributes = {
			...updatedVariants[variantIndex].attributes,
			[attributeId]: value,
		};
		setVariants(updatedVariants);
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Nom du Produit */}
			<div className="field">
				<label className="label">Nom</label>
				<div className="control">
					<input
						className="input"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
			</div>

			{/* Description du Produit */}
			<div className="field">
				<label className="label">Description</label>
				<div className="control">
					<textarea
						className="textarea"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
			</div>

			{/* Prix de Base */}
			<div className="field">
				<label className="label">Prix de Base</label>
				<div className="control">
					<input
						className="input"
						type="number"
						step="0.01"
						value={basePrice}
						onChange={(e) => setBasePrice(e.target.value)}
						required
					/>
				</div>
			</div>

			{/* Catégorie */}
			<div className="field">
				<label className="label">Catégorie</label>
				<div className="control">
					<div className="select is-fullwidth">
						<select
							value={categoryId}
							onChange={(e) => {
								const value = e.target.value;
								setCategoryId(value === "" ? "" : Number(value));
							}}
						>
							<option value="">Sélectionnez une catégorie</option>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* Attributs */}
			<div className="field">
				<label className="label">Attributs</label>
				<div className="control">
					<AttributeSelector
						attributes={attributes}
						selectedAttributes={variants.map((variant) => variant.attributes)}
						onChange={(variantIndex, attributeId, value) => {
							handleAttributeChange(variantIndex, attributeId, value);
						}}
					/>
				</div>
			</div>

			{/* Variantes */}
			<div className="field">
				<label className="label">Variantes</label>
				{variants.map((variant, index) => (
					<div key={index} className="box">
						{/* Prix de la Variante */}
						<div className="field">
							<label className="label">Prix de la Variante</label>
							<div className="control">
								<input
									className="input"
									type="number"
									step="0.01"
									value={variant.price}
									onChange={(e) =>
										handleVariantChange(
											index,
											"price",
											Number.parseFloat(e.target.value),
										)
									}
									required
								/>
							</div>
						</div>

						{/* Stock */}
						<div className="field">
							<label className="label">Stock</label>
							<div className="control">
								<input
									className="input"
									type="number"
									value={variant.stock}
									onChange={(e) =>
										handleVariantChange(
											index,
											"stock",
											Number.parseInt(e.target.value, 10),
										)
									}
									required
								/>
							</div>
						</div>

						{/* Bouton de Suppression de la Variante */}
						<div className="field">
							<div className="control">
								<button
									type="button"
									className="button is-danger is-small"
									onClick={() => handleRemoveVariant(index)}
								>
									Supprimer la Variante
								</button>
							</div>
						</div>
					</div>
				))}
				<div className="control">
					<button
						type="button"
						className="button is-success"
						onClick={handleAddVariant}
					>
						Ajouter une Variante
					</button>
				</div>
			</div>

			{/* Bouton de Soumission */}
			<div className="field is-grouped is-grouped-right">
				<div className="control">
					<button type="submit" className="button is-primary">
						Sauvegarder
					</button>
				</div>
			</div>
		</form>
	);
};

export default ProductForm;
