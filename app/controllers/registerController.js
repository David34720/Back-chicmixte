const { Scrypt } = require('../auth/Scrypt');
const { emailValidator } = require('../middlewares/emailValidator');
const { User } = require('../models');

const registerController = {
    index(req, res) {
        const notification = null;

        res.render('register', { notification });
    },

    async store(req, res) {
        // * on doit valider les champs : on ne fait pas confiance à ce qui vient du client
        const { firstname, lastname, email, password, confirmation } = req.body;

        const notification = null;

        if (!firstname || !lastname || !email || !password || !confirmation) {
            const error = new Error('Il manque des infos au formulaire');

            return res.render('register', { error: error.message, notification });
        }

        if (!emailValidator(email)) {
            return res.render('register', { error: "L'email est incorrect" });
        }

        if (password.length < 6 || confirmation.length < 6) {
            return res.render('register', {
                error: "Le mot de passe n'est pas conforme",
                notification
            });
        }

        if (password !== confirmation) {
            return res.render('register', {
                error: "Le mot de passe n'est pas confirmé",
                notification
            });
        }
        console.log(`firstname, lastname, email, password, confirmation`, firstname, lastname, email, password, confirmation);
        
        const userExists = await User.findOne({ where: { email } });
        console.log('userExists', userExists);
        
        if (userExists) {
            return res.render('register', {
                error: 'La terre est plate',
                notification
            });
        }

        // * hasher le mot de passe
        const hash = Scrypt.hash(password);

        await User.create({
            firstname,
            lastname,
            email,
            password: hash,
        });

        // TODO : se servir de la session pour ajouter un message de succès
        res.redirect('/login');
    },
};

module.exports = { registerController };
