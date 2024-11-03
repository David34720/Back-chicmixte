function auth(req, res, next) {
	// Vérifie si la requête concerne les routes /login ou /register
	if (
		req.path === "/login" ||
		req.path === "/register" ||
		req.path === "/api/login"
	) {
		return next(); // Permet l'accès sans authentification
	}

	// Vérifie si l'utilisateur est connecté
	if (req.session?.user) {
		return next();
	}

	// Redirige vers /login si l'utilisateur n'est pas connecté
	res.redirect("/login");
}

module.exports = { auth };
