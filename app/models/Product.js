const { Model, DataTypes, literal } = require("sequelize");
const { sequelizeConnection } = require("../db/sequelize");

class Product extends Model {}

Product.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		base_price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "categories",
				key: "id",
			},
			allowNull: true,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: literal("CURRENT_TIMESTAMP"),
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize: sequelizeConnection(),
		tableName: "products",
	},
);

module.exports = Product;
