const responseUtils = require("utils/responseUtils")
const authService = require("modules/auth/services/authService")

const authController = {
    login: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const response = await authService.login(email, password, res);
            responseUtils.ok(res, response)
        } catch (error) {
            console.log(error)
            responseUtils.error(res, error.message)
        }
    },
    register: async (req, res) => {
        try {
            await authService.register(req.body);
            responseUtils.ok(res)
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    },
    refresh: async (req, res) => {
        try {
            const data = await authService.refresh(req);
            responseUtils.ok(res, data)
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    },
    logout: async (req, res) => {
        try {
            if (req.cookies.refresh_token) {
                await authService.logout(req.cookies.refresh_token)
                res.clearCookie("refresh_token")
            }
            responseUtils.ok(res);
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    }
}

module.exports = authController