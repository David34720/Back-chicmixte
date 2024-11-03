const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const PermissionHasRole = require('../models/PermissionHasRole');

const adminController = {
    async index(req, res) {
        
        const users = await User.findAll({
            include: {
                model: Role,
                as: 'role',
                include: {
                    model: Permission,
                    as: 'permissions'
                }
            }
        });

        const roles = await Role.findAll({
            include: { all: true, nested: true },
        });

        const permissions = await Permission.findAll({
            include: { all: true, nested: true },
        });

        const permissionHasRole = await PermissionHasRole.findAll({
            include: { all: true, nested: true },
        });

        const notification = req.session.notification || null;
        req.session.notification = null; 

        res.render('admin', { users, roles, permissions, permissionHasRole, notification });
        
    },

    async updateUserRole(req, res) {
      
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.role_id = req.body.role_id;
            await user.save();
        }
        res.redirect('/admin');
       
    },

    async deleteUser(req, res) {
        
        await User.destroy({ where: { id: req.params.id } });
        res.redirect('/admin');
      
    },

    async createRole(req, res) {
        
        await Role.create({ name: req.body.role_name });
        res.redirect('/admin');
        
    },

    async updateRole(req, res) {
        
        const role = await Role.findByPk(req.params.id);
        if (role) {
            role.name = req.body.role_name;
            await role.save();
        }
        res.redirect('/admin');
        
    },

    async deleteRole(req, res) {
        
        await Role.destroy({ where: { id: req.params.id } });
        res.redirect('/admin');
      
    },

    async createPermission(req, res) {
        
        await Permission.create({ name: req.body.permission_name });
        res.redirect('/admin');
        
    },

    async updatePermission(req, res) {
        
        const permission = await Permission.findByPk(req.params.id);
        if (permission) {
            permission.name = req.body.permission_name;
            await permission.save();
        }
        res.redirect('/admin');
       
    },

    async deletePermission(req, res) {
        
        await Permission.destroy({ where: { id: req.params.id } });
        res.redirect('/admin');
        
    },

    async togglePermission(req, res) {
        
        const { role_id, permission_id } = req.body;
        const permissionRole = await PermissionHasRole.findOne({
            where: { role_id, permission_id }
        });

        if (permissionRole) {
            await permissionRole.destroy();
        } else {
            await PermissionHasRole.create({ role_id, permission_id });
        }
        res.redirect('/admin');
       
    },

    async impersonateUser(req, res) {
       
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if (!user) {
            req.session.notification = {
                message: 'Utilisateur non trouvé',
                level: 'error',
            };
            return res.redirect('/admin');
        }

        // Stocke l'utilisateur original dans la session pour permettre un retour en arrière
        req.session.originalAdmin = req.session.user;

        // Remplace les informations de l'utilisateur dans la session par celles de l'utilisateur sélectionné
        req.session.user = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role_id: user.role_id,
            admin: user.admin,
        };

        req.session.notification = {
            message: `Vous êtes maintenant connecté en tant que ${user.firstname} ${user.lastname}`,
            level: 'success',
        };

        return res.redirect('/');
       
    },

    // Optionnel : méthode pour revenir à l'utilisateur original
    async revertImpersonation(req, res) {
        if (req.session.originalAdmin) {
            req.session.user = req.session.originalAdmin;
            req.session.originalAdmin = null;

            req.session.notification = {
                message: 'Vous êtes revenu à votre compte administrateur',
                level: 'success',
            };
        }

        return res.redirect('/admin');
    }
};

module.exports = { adminController };
