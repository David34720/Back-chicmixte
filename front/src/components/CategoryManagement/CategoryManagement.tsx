import type React from "react";
import { useEffect, useState } from "react";
import CategoryForm from "../CategoryForm/CategoryForm";

interface Category {
	id: number;
	name: string;
	parent_id: number | null;
	parent?: Category;
}

const CategoryManagement: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

	// Fonction pour récupérer les catégories depuis l'API
	const fetchCategories = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/categories`,
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

	// Gestion de l'ajout d'une nouvelle catégorie
	const handleAdd = () => {
		setCurrentCategory(null);
		setShowModal(true);
	};

	// Gestion de la modification d'une catégorie existante
	const handleEdit = (category: Category) => {
		setCurrentCategory(category);
		setShowModal(true);
	};

	// Gestion de la suppression d'une catégorie
	const handleDelete = async (id: number) => {
		if (
			window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
		) {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/categories/${id}`,
					{
						method: "DELETE",
					},
				);
				if (!response.ok) {
					throw new Error("Erreur lors de la suppression de la catégorie.");
				}
				fetchCategories();
			} catch (error) {
				console.error("Erreur lors de la suppression de la catégorie :", error);
				alert(
					"Une erreur est survenue lors de la suppression de la catégorie.",
				);
			}
		}
	};

	// Gestion de la soumission du formulaire de catégorie
	const handleFormSubmit = () => {
		setShowModal(false);
		fetchCategories();
	};

	return (
		<div className="container mt-5">
			<h2 className="title">Gestion des Catégories</h2>
			<button className="button is-primary" onClick={handleAdd}>
				Ajouter une Catégorie
			</button>
			<table className="table is-fullwidth is-striped is-hoverable mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nom</th>
						<th>Parent</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((cat) => (
						<tr key={cat.id}>
							<td>{cat.id}</td>
							<td>{cat.name}</td>
							<td>{cat.parent ? cat.parent.name : "N/A"}</td>
							<td>
								<button
									className="button is-info is-small mr-2"
									onClick={() => handleEdit(cat)}
								>
									Modifier
								</button>
								<button
									className="button is-danger is-small"
									onClick={() => handleDelete(cat.id)}
								>
									Supprimer
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Modal */}
			<div className={`modal ${showModal ? "is-active" : ""}`}>
				<div
					className="modal-background"
					onClick={() => setShowModal(false)}
				></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">
							{currentCategory
								? "Modifier la Catégorie"
								: "Ajouter une Catégorie"}
						</p>
						<button
							className="delete"
							aria-label="close"
							onClick={() => setShowModal(false)}
						></button>
					</header>
					<section className="modal-card-body">
						<CategoryForm
							category={currentCategory ? currentCategory : undefined}
							onSubmit={handleFormSubmit}
						/>
					</section>
				</div>
			</div>
		</div>
	);
};

export default CategoryManagement;
