const db = require("models/index");
const languageService = {
    list: async () => {
        const languages = await db.Language.findAll({
            where: {
                deleted: false
            },
        });
        return languages
    },
    detail: async (id) => {
        const language = await db.Language.findOne({
            where: {
                id: id,
                deleted: false
            },
        });
        return language
    },
    create: async (data) => {
        const language = await db.Language.create(data);
        return language
    },
    edit: async (data, id) => {
        await db.Language.update(data, {
            where: {
                id: id
            }
        });
    },
    delete: async (id) => {
        await db.Language.update({
            deleted: true
        }, {
            where: {
                id: id
            }
        });
    }
}
module.exports = languageService