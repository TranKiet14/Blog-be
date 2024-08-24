const { BodyWithLocale } = require("kernels/rules");
const roleValidation = {
    create: [
        new BodyWithLocale('title').notEmpty(),
    ]
}
module.exports = roleValidation