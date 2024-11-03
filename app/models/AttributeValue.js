const { Model, DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../db/sequelize");

class AttributeValue extends Model {}

AttributeValue.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		attribute_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "attributes",
				key: "id",
			},
			allowNull: false,
		},
		value: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: sequelizeConnection(),
		tableName: "attribute_values",
		timestamps: false,
	},
);

module.exports = AttributeValue;
