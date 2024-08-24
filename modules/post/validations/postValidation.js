const { BodyWithLocale } = require("kernels/rules");
const postValidation = {
    create: [
        new BodyWithLocale('title').notEmpty(),
    ]
}
module.exports = postValidation