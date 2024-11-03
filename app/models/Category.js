const { Model, DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../db/sequelize");

class Category extends Model {}

Category.init(
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
		parent_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Category,
				key: "id",
			},
			allowNull: true,
		},
	},
	{
		sequelize: sequelizeConnection(),
		tableName: "categories",
		timestamps: false,
	},
);

module.exports = Category;
