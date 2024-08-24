const db = require("models/index");
const postService = {
    list: async () => {
        const posts = await db.Post.findAll({
            where: {
                deleted: false
            },
            include: [{
                model: db.Category,
                as: 'categories',
            },
            {
                model: db.User,
                as: 'user',
            },
            {
                model: db.Content_Post,
                as: 'content_posts',
            }],
        });
        return posts
    },
    detail: async (id) => {
        const post = await db.Post.findOne({
            where: {
                id: id,
                deleted: false
            },
            include: [{
                model: db.Category,
                as: 'categories',
            },
            {
                model: db.User,
                as: 'user',
            },
            {
                model: db.Content_Post,
                as: 'content_posts',
                include: [{
                    model: db.Language,
                    as: 'language',
                }]
            }],
        });
        return post
    },
    create: async (data, user_id) => {
        const post = await db.Post.create({
            status: "active",
            user_id: user_id,
            thumbnail: data?.thumbnail
        })
        const post_categories = data.category_ids.map(item => ({
            category_id: item,
            post_id: post.id
        }))
        await db.Post_Category.bulkCreate(post_categories)
        const content_posts = data.content_posts.map(item => ({
            title: item.title,
            language_id: item.language_id,
            content: item.content,
            original_post_id: post.id
        }))
        await db.Content_Post.bulkCreate(content_posts)
        return post
    },
    edit: async (post_id, data) => {
        await db.Post.update({
            // status: data.status,
            thumbnail: data?.thumbnail
        }, {
            where: {
                id: post_id
            }
        })
        if(data.category_ids){
            await db.Post_Category.destroy({
                where: {
                    post_id: post_id
                }
            })
            const post_categories = data.category_ids.map(item => ({
                category_id: item,
                post_id: post_id
            }))
            await db.Post_Category.bulkCreate(post_categories)
        }
        for (const item of data.content_posts) {
            await db.Content_Post.update({
                title: item.title,
                content: item.content
            }, {
                where: {
                    id: item.id
                }
            })
        }
    },
    delete: async (id) => {
        await db.Post.update({
            deleted: true
        }, {
            where: {
                id: id
            }
        });
    },
    detailSlug: async (slug) => {
        const content_post = await db.Content_Post.findOne({
            where: {
                slug: slug
            },
            include: [{
                model: db.Post,
                as: 'post',
                include: [
                    {
                        model: db.User,
                        as: 'user'
                    },
                    {
                        model: db.Comment,
                        as: "comments",
                        include: [
                            {
                                model: db.User,
                                as: 'user'
                            }
                        ]
                    }
                ]
            }],
        });
        return content_post
    },
    listByCategory: async () => {
        const posts = await db.Post.findAll({
            where: {
                
                deleted: false
            },
            include: [{
                model: db.Category,
                as: 'categories',
            },
            {
                model: db.User,
                as: 'user',
            },
            {
                model: db.Content_Post,
                as: 'content_posts',
            }],
        });
        return posts
    },
}
module.exports = postService