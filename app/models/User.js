// * On importe les modules nécessaires à la création de models
const { Model, DataTypes, literal } = require('sequelize');
// * notre connexion à la BDD
const { sequelizeConnection } = require('../db/sequelize');

class User extends Model {
    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    get credentials() {
        return {
            email: this.email,
            password: this.password,
        };
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        email: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        firstname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        lastname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        img: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: 'default.png',
        },

        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        // On supprime l'attribut `role` car il y a une relation avec le modèle `Role`
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },

        updated_at: DataTypes.DATE,
    },
    {
        sequelize: sequelizeConnection(),
        tableName: 'users',
    }
);

module.exports = User;
