const responseUtils = require("utils/responseUtils")
const postService = require("modules/post/services/postService")

const postController = {
    index: async (req, res) => {
        // Implement your logic
        const posts = await postService.list();
        responseUtils.ok(res, posts);
    },

    detail: async (req, res) => {
        try {
            const post = await postService.detail(req.params.id);
            responseUtils.ok(res, post);
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    },
    create: async (req, res) => {
        try {
            const post = await postService.create(req.body, req.user.id);
            responseUtils.ok(res, post)
        } catch (error) {
            console.log(error)
            responseUtils.error(res, error.message)
        }
    },
    edit: async (req, res) => {
        try {
            await postService.edit(req.params.id, req.body);
            responseUtils.ok(res, "Update success!!!")
        } catch (error) {
            console.log(error)
            responseUtils.error(res, error.message)
        }
    },
    detailSlug: async (req, res) => {
        try {
            const content_post = await postService.detailSlug(req.params.slug);
            responseUtils.ok(res, content_post)
        } catch (error) {
            
            responseUtils.error(res, error.message)
        }
    },
    delete: async (req, res) => {
        try {
            await postService.delete(req.params.id)
            responseUtils.ok(res, "Delete success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    }
}

module.exports = postController