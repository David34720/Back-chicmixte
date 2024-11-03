import type React from "react";
import { useEffect, useState, type FormEvent } from "react";

interface Category {
	id: number;
	name: string;
	parent_id: number | null;
}

interface CategoryFormProps {
	category?: Category;
	onSubmit: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSubmit }) => {
	const [name, setName] = useState<string>(category ? category.name : "");
	const [parentId, setParentId] = useState<number | "">(
		category && category.parent_id !== null ? category.parent_id : "",
	);
	const [categories, setCategories] = useState<Category[]>([]);

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

	useEffect(() => {
		fetchCategories();
	}, []);

	// Gestion de la soumission du formulaire
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const payload = {
			name,
			parent_id: parentId === "" ? null : parentId,
		};

		try {
			const response = await fetch(
				category
					? `${import.meta.env.VITE_API_URL}/categories/${category.id}`
					: `${import.meta.env.VITE_API_URL}/categories`,
				{
					method: category ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);
			console.log("Response status:", response.status);
			console.log(`${import.meta.env.VITE_API_URL}/categories`);
			if (!response.ok) {
				throw new Error("Erreur lors de la sauvegarde de la catégorie.");
			}
			onSubmit();
		} catch (error: any) {
			console.error(error);
			alert(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Nom de la Catégorie */}
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

			{/* Catégorie Parente */}
			<div className="field">
				<label className="label">Catégorie Parente</label>
				<div className="control">
					<div className="select is-fullwidth">
						<select
							value={parentId}
							onChange={(e) => {
								const value = e.target.value;
								setParentId(value === "" ? "" : Number(value));
							}}
						>
							<option value="">Aucune</option>
							{categories
								.filter((cat) => !category || cat.id !== category.id)
								.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
						</select>
					</div>
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

export default CategoryForm;
