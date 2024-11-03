import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Réinitialise les erreurs au début de chaque tentative de connexion

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL_LOGIN}/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
					credentials: "include", // pour inclure les cookies de session
				},
			);

			if (!response.ok) {
				throw new Error("Échec de la connexion. Vérifiez vos identifiants.");
			}

			const data = await response.json();
			console.log("Connexion réussie !", data);
			setIsAuthenticated(true);

			// Redirige l'utilisateur vers la page d'accueil
			navigate("/home");
		} catch (err: any) {
			setError(err.message);
		}
	};

	return isAuthenticated ? (
		<HomePage />
	) : (
		<div className="container is-max-desktop">
			<div className="box">
				<h2 className="title is-4 has-text-centered">Connexion</h2>
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input
								className="input"
								type="email"
								placeholder="Entrez votre email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Mot de passe</label>
						<div className="control">
							<input
								className="input"
								type="password"
								placeholder="Entrez votre mot de passe"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</div>
					{error && <p className="help is-danger">{error}</p>}
					<div className="field">
						<div className="control">
							<button className="button is-primary is-fullwidth" type="submit">
								Se connecter
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
