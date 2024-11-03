const { Sequelize } = require('sequelize');

function sequelizeConnection() {
    const sequelize = new Sequelize(process.env.DB_URL, {
        // * cette options est obligatoire
        dialect: 'postgres',
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
        },
    });

    return sequelize;
}

module.exports = { sequelizeConnection };
