const { Model, DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../db/sequelize');

class Role extends Model {}

Role.init(
    {
        name: DataTypes.TEXT,
    },
    {
        sequelize: sequelizeConnection(),
        tableName: 'role',
        timestamps: false,
    }
);

module.exports = Role;
