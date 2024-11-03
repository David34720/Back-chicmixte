const { User } = require('../models');
const { Gate } = require('../auth/Gate');

/**
 * Ce middleware laisse passer si user possède la permission action
 * @param {string} action la permissions recherchée
 * @returns {(function(*, *, *): Promise<*>)|*}
 */
function authorise(action) {
    return async (req, res, next) => {
        const { id } = req.session.user;

        const user = await User.findByPk(id, {
            include: { association: 'role', include: 'permissions' },
        });

        if (Gate.allows(action, user)) {
            return next();
        }

        const error = new Error('You shall not pass !');
        error.statusCode = 403;
        return next(error);
    };
}

module.exports = { authorise };
