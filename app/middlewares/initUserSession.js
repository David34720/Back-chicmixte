const { User } = require('../models');
const  Role  = require('../models/Role.js');

async function initUserSession(req, res, next) {
    if (req.session?.user) {
        const user = await User.findByPk(req.session.user.id, {
            include: { model: Role, as: 'role' }  // Charger le rôle de l'utilisateur
        });

        if (user) {
            res.locals.user = user;
        } else {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }

    next();
}

module.exports = { initUserSession };
