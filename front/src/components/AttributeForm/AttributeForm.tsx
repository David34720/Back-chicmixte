import type React from "react";
import { useState, type FormEvent } from "react";

interface AttributeValue {
	id: number;
	value: string;
}

interface Attribute {
	id: number;
	name: string;
	values: AttributeValue[];
}

interface AttributeFormProps {
	attribute?: Attribute;
	onSubmit: () => void;
}

const AttributeForm: React.FC<AttributeFormProps> = ({
	attribute,
	onSubmit,
}) => {
	const [name, setName] = useState<string>(attribute ? attribute.name : "");
	const [values, setValues] = useState<string[]>(
		attribute ? attribute.values.map((v) => v.value) : [""],
	);

	const handleValueChange = (index: number, value: string) => {
		const updatedValues = [...values];
		updatedValues[index] = value;
		setValues(updatedValues);
	};

	const handleAddValue = () => {
		setValues([...values, ""]);
	};

	const handleRemoveValue = (index: number) => {
		const updatedValues = [...values];
		updatedValues.splice(index, 1);
		setValues(updatedValues);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const payload = {
			name,
			values: values.filter((v) => v.trim() !== ""),
		};

		try {
			const response = await fetch(
				attribute
					? `${import.meta.env.VITE_API_URL}/attributes/${attribute.id}`
					: `${import.meta.env.VITE_API_URL}/attributes`,
				{
					method: attribute ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);

			if (!response.ok) {
				throw new Error("Erreur lors de la sauvegarde de l'attribut.");
			}

			onSubmit();
		} catch (error: any) {
			console.error(error);
			alert(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Nom de l'Attribut */}
			<div className="field">
				<label className="label">Nom de l'Attribut</label>
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

			{/* Valeurs de l'Attribut */}
			<div className="field">
				<label className="label">Valeurs de l'Attribut</label>
				{values.map((val, index) => (
					<div key={index} className="field has-addons">
						<div className="control is-expanded">
							<input
								className="input"
								type="text"
								value={val}
								onChange={(e) => handleValueChange(index, e.target.value)}
								required
							/>
						</div>
						<div className="control">
							<button
								type="button"
								className="button is-danger"
								onClick={() => handleRemoveValue(index)}
							>
								Supprimer
							</button>
						</div>
					</div>
				))}
				<button
					type="button"
					className="button is-success mt-2"
					onClick={handleAddValue}
				>
					Ajouter une Valeur
				</button>
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

export default AttributeForm;
