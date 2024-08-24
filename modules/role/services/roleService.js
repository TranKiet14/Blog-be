const db = require("models/index")
const { Op } = require('sequelize');
const roleService = {
    list: async () => {
        const roles = await db.Role.findAll({
            where: {
                deleted: false
            },
            include: [{
                model: db.Permission,
                as: 'permissions',
            }]
        });
        return roles
    },
    create: async (data) => {
        const role = await db.Role.create(data);
        return role
    },
    edit: async (data, id) => {
        await db.Role.update(data, {
            where: {
                id: id
            }
        });
    },
    delete: async (id) => {
        await db.Role.update({
            deleted: true
        }, {
            where: {
                id: id
            }
        });
    },
    permission: async (record) => {
        await db.Permission_Role.destroy({
            where: {
                role_id: {
                    [Op.or]: record.map(item => item.role_id),
                }
            }
        })
        let permissions = []
        for (const item of record) {
            for (const permission_id of item.ids) {
                permissions.push({
                    role_id: item.role_id,
                    permission_id: permission_id
                })
            }
        }
        await db.Permission_Role.bulkCreate(permissions)
    }
}
module.exports = roleService