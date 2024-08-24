const jwt = require("jsonwebtoken")
const { config } = require("configs");
const db = require("models/index");
const responseUtils = require("utils/responseUtils");
const jwtUtils = require("utils/jwtUtils")
const authMiddleware = {
    requireAuth: async (req, res, next) => {
        if (req.headers.authorization) {
            const accessToken = req.headers.authorization.split(" ")[1];
            try {
                const data = jwtUtils.verifyToken(accessToken)
                const account = await db.User.findOne({
                    where: {
                        id: data.userId,
                        deleted: false
                    },
                    attributes: {
                        exclude: ["password"]
                    }
                })
                if (!account) {
                    responseUtils.unauthorized(res)
                } else {
                    req.user = account;
                    next();
                }
            } catch (error) {
                responseUtils.unauthorized(res)
                // console.log(error)
            }
        }
        else {
            responseUtils.unauthorized(res)
        }
    }
}
module.exports = authMiddleware