const responseUtils = require("utils/responseUtils")
const userService = require("modules/user/services/userService")

const userController = {
    index: async (req, res) => {
        // Implement your logic
        const users = await userService.list();
        responseUtils.ok(res, users);
    },

    detail: async (req, res) => {
        const user = await userService.detail(req.params.id);
        responseUtils.ok(res, user);
    },

    create: async (req, res) => {
        try {
            await userService.create(req.body);
            responseUtils.ok(res)
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    },

    edit: async (req, res) => {
        try {
            await userService.edit(req.body, req.params.id)
            responseUtils.ok(res, "Update success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    },

    delete: async (req, res) => {
        try {
            await userService.delete(req.params.id)
            responseUtils.ok(res, "Delete success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    }

}

module.exports = userController