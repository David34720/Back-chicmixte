const { Model, DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../db/sequelize");

class ProductVariant extends Model {}

ProductVariant.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		product_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "products",
				key: "id",
			},
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	},
	{
		sequelize: sequelizeConnection(),
		tableName: "product_variants",
	},
);

module.exports = ProductVariant;
