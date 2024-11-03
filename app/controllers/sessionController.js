const { Scrypt } = require("../auth/Scrypt");
const { emailValidator } = require("../middlewares/emailValidator");
const { User } = require("../models");

const sessionController = {
	index(req, res) {
		const notification = req.session.notification || null;
		req.session.notification = null;
		res.render("login", { notification });
	},

	async store(req, res) {
		const { email, password } = req.body;

		if (!emailValidator(email)) {
			return res.render("login", {
				error: "L'email est incorrect",
				notification: null,
			});
		}

		if (password.length < 4) {
			return res.render("login", {
				error: "Le mot de passe n'est pas conforme",
				notification: null,
			});
		}

		const userExist = await User.findOne({ where: { email } });
		if (!userExist) {
			return res.render("login", {
				error: "Une erreur s'est produite",
				notification: null,
			});
		}

		const ok = await Scrypt.compare(password, userExist.password);

		if (!ok) {
			return res.render("login", {
				error: "Une erreur MP s'est produite",
				notification: null,
			});
		}

		// ! On efface le password de l'utilisateur
		delete userExist.dataValues.password;
		delete userExist._previousDataValues.password;

		req.session.user = userExist;
		req.session.notification = null;
		res.redirect("/");
	},

	async destroy(req, res) {
		req.session.user = null;

		req.session.notification = {
			message: `Déconnexion ok à bientôt`,
			level: "success",
		};

		res.redirect("/");
	},

	async apiStore(req, res) {
		const { email, password } = req.body;

		// Validation de l'email
		if (!emailValidator(email)) {
			return res.status(400).json({ error: "L'email est incorrect" });
		}

		// Validation du mot de passe
		if (password.length < 4) {
			return res.status(400).json({ error: "Le mot de passe est trop court" });
		}

		// Vérifie si l'utilisateur existe dans la base de données
		const userExist = await User.findOne({ where: { email } });
		if (!userExist) {
			return res.status(404).json({ error: "Utilisateur non trouvé" });
		}

		// Vérifie si le mot de passe est correct
		const ok = await Scrypt.compare(password, userExist.password);
		if (!ok) {
			return res.status(401).json({ error: "Mot de passe incorrect" });
		}

		// Supprime le mot de passe avant de renvoyer les informations utilisateur
		delete userExist.dataValues.password;

		// Option 1 : Avec session - Assigne l'utilisateur à la session
		req.session.user = userExist;

		// Option 2 : Avec JWT - Créer un token pour le front
		// const token = jwt.sign({ id: userExist.id }, process.env.SECRET, { expiresIn: '1h' });

		res.status(200).json({
			message: "Connexion réussie",
			user: userExist,
			// token: token, // à envoyer si JWT
		});
	},
};

module.exports = { sessionController };
