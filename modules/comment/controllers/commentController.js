const responseUtils = require("utils/responseUtils");
const commentService = require("../services/commentService");

const commentController = {
    create: async (req, res) => {
        try {
            const comment = await commentService.create(req.user.id, req.body);
            responseUtils.ok(res, comment);
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    }
}

module.exports = commentController