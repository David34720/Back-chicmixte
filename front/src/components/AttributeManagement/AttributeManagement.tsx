import type React from "react";
import { useEffect, useState } from "react";
import AttributeForm from "../AttributeForm/AttributeForm";

interface AttributeValue {
	id: number;
	value: string;
}

interface Attribute {
	id: number;
	name: string;
	values: AttributeValue[];
}

const AttributeManagement: React.FC = () => {
	const [attributes, setAttributes] = useState<Attribute[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [currentAttribute, setCurrentAttribute] = useState<Attribute | null>(
		null,
	);

	// Fonction pour récupérer les attributs depuis l'API
	const fetchAttributes = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/attributes`,
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
		fetchAttributes();
	}, []);

	// Gestion de l'ajout d'un nouvel attribut
	const handleAdd = () => {
		setCurrentAttribute(null);
		setShowModal(true);
	};

	// Gestion de la modification d'un attribut existant
	const handleEdit = (attribute: Attribute) => {
		setCurrentAttribute(attribute);
		setShowModal(true);
	};

	// Gestion de la suppression d'un attribut
	const handleDelete = async (id: number) => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer cet attribut ?")) {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/attributes/${id}`,
					{
						method: "DELETE",
					},
				);
				if (!response.ok) {
					throw new Error("Erreur lors de la suppression de l'attribut.");
				}
				fetchAttributes();
			} catch (error) {
				console.error("Erreur lors de la suppression de l'attribut :", error);
				alert("Une erreur est survenue lors de la suppression de l'attribut.");
			}
		}
	};

	// Gestion de la soumission du formulaire d'attribut
	const handleFormSubmit = () => {
		setShowModal(false);
		fetchAttributes();
	};

	return (
		<div className="container mt-5">
			<h2 className="title">Gestion des Attributs</h2>
			<button className="button is-primary" onClick={handleAdd}>
				Ajouter un Attribut
			</button>
			<table className="table is-fullwidth is-striped is-hoverable mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nom</th>
						<th>Valeurs</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{attributes.map((attr) => (
						<tr key={attr.id}>
							<td>{attr.id}</td>
							<td>{attr.name}</td>
							<td>{attr.values.map((val) => val.value).join(", ")}</td>
							<td>
								<button
									className="button is-info is-small mr-2"
									onClick={() => handleEdit(attr)}
								>
									Modifier
								</button>
								<button
									className="button is-danger is-small"
									onClick={() => handleDelete(attr.id)}
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
							{currentAttribute ? "Modifier l'Attribut" : "Ajouter un Attribut"}
						</p>
						<button
							className="delete"
							aria-label="close"
							onClick={() => setShowModal(false)}
						></button>
					</header>
					<section className="modal-card-body">
						<AttributeForm
							attribute={currentAttribute ? currentAttribute : undefined}
							onSubmit={handleFormSubmit}
						/>
					</section>
				</div>
			</div>
		</div>
	);
};

export default AttributeManagement;
