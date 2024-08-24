const { BodyWithLocale } = require("kernels/rules");
const categoryValidation = {
    create: [
        new BodyWithLocale('title').notEmpty(),
    ]
}
module.exports = categoryValidation