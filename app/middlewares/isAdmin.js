const { User } = require('../models');

/**
 * Ce middleware laisse passer les utilisateurs qui ont un rôle boss ou une permission all
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function isAdmin(req, res, next) {
    const user = req.session?.user;

    const userInstance = await User.findByPk(user.id, {
        include: { all: true, nested: true },
    });

    let role = null;

    if (Object.prototype.hasOwnProperty.call(userInstance.dataValues, 'role')) {
        role = userInstance.dataValues.role.name === 'boss';
    }

    if (role) {
        return next();
    }

    const permissions = userInstance.permissions;
    for (const permission of permissions) {
        if (permission.name === 'all') {
            return next();
        }
    }

    const error = new Error('Vous ne passerez pas !');
    error.statusCode = 403;

    return next(error);
}

module.exports = { isAdmin };