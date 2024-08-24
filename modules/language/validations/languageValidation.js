const { BodyWithLocale } = require("kernels/rules");
const languageValidation = {
    create: [
        new BodyWithLocale('title').notEmpty(),
        new BodyWithLocale('language_code').notEmpty(),
        new BodyWithLocale('flag').notEmpty(),
    ]
}
module.exports = languageValidation