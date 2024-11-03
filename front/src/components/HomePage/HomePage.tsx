// src/components/HomePage/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="container mt-5">
			<h1 className="title">Chic'Mixte Backstage</h1>
			<div className="buttons">
				<Link to="/products" className="button is-primary">
					Gestion des Produits
				</Link>
				<Link to="/categories" className="button is-link">
					Gestion des Catégories
				</Link>
				<Link to="/attributes" className="button is-info">
					Gestion des Attributs
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
