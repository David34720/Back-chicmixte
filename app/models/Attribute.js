const { Model, DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../db/sequelize");

class Attribute extends Model {}

Attribute.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize: sequelizeConnection(),
		tableName: "attributes",
		timestamps: false,
	},
);

module.exports = Attribute;
