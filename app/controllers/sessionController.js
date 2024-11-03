
const { Scrypt } = require('../auth/Scrypt');
const { emailValidator } = require('../middlewares/emailValidator');
const { User } = require('../models');

const sessionController = {
    index(req, res) {
        const notification = req.session.notification || null;
        req.session.notification = null;
        res.render('login', { notification });
        
    },

    async store(req, res) {
        const { email, password } = req.body;

        if (!emailValidator(email)) {
            return res.render('login', { error: "L'email est incorrect",
                notification: null, });
        }

        if (password.length < 4) {
            return res.render('login', {
                error: "Le mot de passe n'est pas conforme",
                notification: null,
            });
        }

        const userExist = await User.findOne({ where: { email } });
        if (!userExist) {
            return res.render('login', {
                error: "Une erreur s'est produite",
                notification: null,
            });
        }

        const ok = await Scrypt.compare(password, userExist.password);

        if (!ok) {
            return res.render('login', {
                error: "Une erreur MP s'est produite",
                notification: null,
            });
        }

        // ! On efface le password de l'utilisateur
        delete userExist.dataValues.password;
        delete userExist._previousDataValues.password;

        req.session.user = userExist;
        req.session.notification = null;
        res.redirect('/');
    },

    async destroy(req, res) {
        req.session.user = null;
        
        req.session.notification = {
            message: `Déconnexion ok à bientôt`,
            level: 'success',
        };

        res.redirect('/');
    },
};

module.exports = { sessionController };
