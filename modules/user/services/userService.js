const db = require("models/index");
const bcrypt = require("bcrypt")
const userService = {
    list: async () => {
        const users = await db.User.findAll({
            where: {
                deleted: false
            },
            include: [{
                model: db.Role,
                as: 'role',
            }],
            attributes: {
                exclude: ["password"]
            }
        });
        return users
    },
    detail: async (id) => {
        const user = await db.User.findOne({
            where: {
                id: id,
                deleted: false
            },
            include: [{
                model: db.Role,
                as: 'role',
            }],
            attributes: {
                exclude: ["password"]
            }
        });
        return user
    },
    create: async (data) => {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);
        const infoAccount = {
            fullName: data.fullName,
            email: data.email,
            password: passwordHash,
            avatar: data?.avatar,
            role_id: data.role_id,
            status: data.status
        }
        await db.User.create(infoAccount);
    },
    edit: async (data, id) => {
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }
        await db.User.update(data, {
            where: {
                id: id
            }
        });
    },
    delete: async (id) => {
        await db.User.update({
            deleted: true
        }, {
            where: {
                id: id
            }
        });
    }
}
module.exports = userService