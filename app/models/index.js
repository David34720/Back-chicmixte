const User = require("./User");
const Role = require("./Role");
const Permission = require("./Permission");
const PermissionHasRole = require("./PermissionHasRole");
const Category = require("./Category");
const Product = require("./Product");
const Attribute = require("./Attribute");
const AttributeValue = require("./AttributeValue");
const ProductVariant = require("./ProductVariant");
const ProductVariantAttribute = require("./ProductVariantAttribute");

// Relations entre les permissions et les rôles
Permission.belongsToMany(Role, {
	through: PermissionHasRole,
	foreignKey: "permission_id",
	otherKey: "role_id",
	as: "roles",
});

Role.belongsToMany(Permission, {
	through: PermissionHasRole,
	foreignKey: "role_id",
	otherKey: "permission_id",
	as: "permissions",
});

Role.hasMany(User, {
	foreignKey: "role_id",
	as: "users",
});

User.belongsTo(Role, {
	foreignKey: "role_id",
	as: "role",
});

// Relations pour la gestion des produits
Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

Attribute.hasMany(AttributeValue, { foreignKey: "attribute_id", as: "values" });
AttributeValue.belongsTo(Attribute, {
	foreignKey: "attribute_id",
	as: "attribute",
});

Product.hasMany(ProductVariant, { foreignKey: "product_id", as: "variants" });
ProductVariant.belongsTo(Product, { foreignKey: "product_id", as: "product" });

ProductVariant.belongsToMany(AttributeValue, {
	through: ProductVariantAttribute,
	foreignKey: "variant_id",
	otherKey: "attribute_value_id",
	as: "attributes",
});
AttributeValue.belongsToMany(ProductVariant, {
	through: ProductVariantAttribute,
	foreignKey: "attribute_value_id",
	otherKey: "variant_id",
	as: "variants",
});

Category.hasMany(Category, {
	foreignKey: "parent_id",
	as: "subcategories", // Nom pour les sous-catégories
});

Category.belongsTo(Category, {
	foreignKey: "parent_id",
	as: "parentCategory", // Nom pour la catégorie parente
});

// Export des modèles
module.exports = {
	Role,
	Permission,
	PermissionHasRole,
	User,
	Category,
	Product,
	Attribute,
	AttributeValue,
	ProductVariant,
	ProductVariantAttribute,
};
