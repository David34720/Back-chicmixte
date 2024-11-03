import type React from "react";
import { useEffect, useState } from "react";
import ProductForm from "../ProductForm/ProductForm";

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
	category?: Category;
}

const ProductManagement: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

	// Fonction pour récupérer les produits depuis l'API
	const fetchProducts = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
			if (!response.ok) {
				throw new Error("Erreur lors de la récupération des produits.");
			}
			const data: Product[] = await response.json();
			setProducts(data);
		} catch (error) {
			console.error("Erreur lors de la récupération des produits :", error);
			alert("Une erreur est survenue lors de la récupération des produits.");
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	// Gestion de l'ajout d'un nouveau produit
	const handleAdd = () => {
		setCurrentProduct(null);
		setShowModal(true);
	};

	// Gestion de la modification d'un produit existant
	const handleEdit = (product: Product) => {
		setCurrentProduct(product);
		setShowModal(true);
	};

	// Gestion de la suppression d'un produit
	const handleDelete = async (id: number) => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/products/${id}`,
					{
						method: "DELETE",
					},
				);
				if (!response.ok) {
					throw new Error("Erreur lors de la suppression du produit.");
				}
				fetchProducts();
			} catch (error) {
				console.error("Erreur lors de la suppression du produit :", error);
				alert("Une erreur est survenue lors de la suppression du produit.");
			}
		}
	};

	// Gestion de la soumission du formulaire de produit
	const handleFormSubmit = () => {
		setShowModal(false);
		fetchProducts();
	};

	return (
		<div className="container mt-5">
			<h2 className="title">Gestion des Produits</h2>
			<button className="button is-primary" onClick={handleAdd}>
				Ajouter un Produit
			</button>
			<table className="table is-fullwidth is-striped is-hoverable mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nom</th>
						<th>Description</th>
						<th>Prix de Base</th>
						<th>Catégorie</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((prod) => (
						<tr key={prod.id}>
							<td>{prod.id}</td>
							<td>{prod.name}</td>
							<td>{prod.description}</td>
							<td>{prod.base_price.toFixed(2)} €</td>
							<td>{prod.category ? prod.category.name : "N/A"}</td>
							<td>
								<button
									className="button is-info is-small mr-2"
									onClick={() => handleEdit(prod)}
								>
									Modifier
								</button>
								<button
									className="button is-danger is-small"
									onClick={() => handleDelete(prod.id)}
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
							{currentProduct ? "Modifier le Produit" : "Ajouter un Produit"}
						</p>
						<button
							className="delete"
							aria-label="close"
							onClick={() => setShowModal(false)}
						></button>
					</header>
					<section className="modal-card-body">
						<ProductForm
							product={currentProduct ? currentProduct : undefined}
							onSubmit={handleFormSubmit}
						/>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ProductManagement;
