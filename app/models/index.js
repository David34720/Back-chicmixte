const User = require("./User");
const Role = require("./Role");
const Permission = require("./Permission");
const PermissionHasRole = require("./PermissionHasRole");

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

// Export des modèles avec leurs relations
module.exports = { Role, Permission, PermissionHasRole, User };
