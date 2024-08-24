const db = require("models/index");
const { BodyWithLocale } = require("kernels/rules");
const authValidation = {
    login: [
        new BodyWithLocale('email').notEmpty(),
        new BodyWithLocale('email').isEmail(),
        new BodyWithLocale('password').notEmpty(),
    ],
    register: [
        new BodyWithLocale('email').notEmpty(),
        new BodyWithLocale('email').isEmail(),
        new BodyWithLocale('email').unique(db.User, 'email'),
        new BodyWithLocale('password').notEmpty(),
    ]
}
module.exports = authValidation