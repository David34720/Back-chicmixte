const { Model, DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../db/sequelize");

class ProductVariantAttribute extends Model {}

ProductVariantAttribute.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		variant_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "product_variants",
				key: "id",
			},
			allowNull: false,
		},
		attribute_value_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "attribute_values",
				key: "id",
			},
			allowNull: false,
		},
	},
	{
		sequelize: sequelizeConnection(),
		tableName: "product_variant_attributes",
		timestamps: false,
		uniqueKeys: {
			unique_variant_attribute: {
				fields: ["variant_id", "attribute_value_id"],
			},
		},
	},
);

module.exports = ProductVariantAttribute;
