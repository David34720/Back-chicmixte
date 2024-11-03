const { Model, DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../db/sequelize');

class PermissionHasRole extends Model {}

PermissionHasRole.init(
    {
        permission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize: sequelizeConnection(),
        tableName: 'permission_has_role',
        timestamps: false,
    }
);

module.exports = PermissionHasRole;
