const express = require("express");
const adminRouter = express.Router();
const { adminController } = require("../controllers/adminController.js");
const {
	handlers: { catcher },
} = require("../middlewares");
const { auth } = require("../middlewares/auth.js");
const { isAdmin } = require("../middlewares/isAdmin.js");

// Route pour afficher la page d'administration
adminRouter.get("/admin", catcher(adminController.index));
//[auth, isAdmin] ,

// Routes pour l'Impersonation des utilisateurs
adminRouter.post(
	"/admin/impersonate/:id",
	[auth, isAdmin],
	catcher(adminController.impersonateUser),
);
adminRouter.post(
	"/admin/revert-impersonation",
	[auth],
	catcher(adminController.revertImpersonation),
);

// Routes pour la gestion des utilisateurs
adminRouter.post(
	"/users/updateRole/:id",
	catcher(adminController.updateUserRole),
);
adminRouter.post("/users/delete/:id", catcher(adminController.deleteUser));

// Routes pour la gestion des rôles
adminRouter.post("/roles/create", catcher(adminController.createRole));
adminRouter.post("/roles/update/:id", catcher(adminController.updateRole));
adminRouter.post("/roles/delete/:id", catcher(adminController.deleteRole));

// Routes pour la gestion des permissions
adminRouter.post(
	"/permissions/create",
	catcher(adminController.createPermission),
);
adminRouter.post(
	"/permissions/update/:id",
	catcher(adminController.updatePermission),
);
adminRouter.post(
	"/permissions/delete/:id",
	catcher(adminController.deletePermission),
);

// Route pour gérer l'attribution des permissions aux rôles
adminRouter.post(
	"/permissions/toggle",
	catcher(adminController.togglePermission),
);

module.exports = { adminRouter };
