const db = require("models/index");
const categoryService = {
    list: async () => {
        const categories = await db.Category.findAll({
            where: {
                deleted: false
            },
            include: [{
                model: db.Post,
                as: 'posts',
            }],
        });
        return categories
    },
    detail: async (id) => {
        const category = await db.Category.findOne({
            where: {
                id: id,
                deleted: false
            },
            include: [{
                model: db.Post,
                as: 'posts',
                include: [
                {
                    model: db.User,
                    as: 'user',
                },
                {
                    model: db.Content_Post,
                    as: 'content_posts',
                }],
            }],
        });
        return category
    },
    detailBySlug: async (slug) => {
        const category = await db.Category.findOne({
            where: {
                slug: slug,
                deleted: false
            },
            include: [{
                model: db.Post,
                as: 'posts',
                include: [
                {
                    model: db.User,
                    as: 'user',
                },
                {
                    model: db.Content_Post,
                    as: 'content_posts',
                }],
            }],
        });
        return category
    },
    create: async (data) => {
        const category = await db.Category.create(data);
        return category
    },
    edit: async (data, id) => {
        await db.Category.update(data, {
            where: {
                id: id
            }
        });
    },
    delete: async (id) => {
        await db.Category.update({
            deleted: true
        }, {
            where: {
                id: id
            }
        });
    }
}
module.exports = categoryService