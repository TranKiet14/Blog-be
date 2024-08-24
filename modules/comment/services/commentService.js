const db = require("models/index");
const commentService = {
    create: async (user_id, data) => {
        const comment = await db.Comment.create({
            content: data.content,
            post_id: data.post_id,
            user_id: user_id
        })
        return comment;
    }
}

module.exports = commentService