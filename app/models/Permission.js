const { Model, DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../db/sequelize');

class Permission extends Model {}

Permission.init(
    {
        name: DataTypes.TEXT,
    },
    {
        sequelize: sequelizeConnection(),
        tableName: 'permission',
        timestamps: false,
    }
);

module.exports = Permission;
