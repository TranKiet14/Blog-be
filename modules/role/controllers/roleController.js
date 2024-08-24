const responseUtils = require("utils/responseUtils")
const roleService = require("modules/role/services/roleService");
const permission = require("models/permission");

const roleController = {
    index: async (req, res) => {
        const roles = await roleService.list();
        responseUtils.ok(res, roles)
    },
    create: async (req, res) => {
        try {
            const role = await roleService.create(req.body);
            responseUtils.ok(res, role)
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    },
    edit: async (req, res) => {
        try {
            await roleService.edit(req.body, req.params.id);
            responseUtils.ok(res, "Update success!!!")
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    },
    delete: async (req, res) => {
        try {
            await roleService.delete(req.params.id);
            responseUtils.ok(res, "Delete success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    },
    permission: async (req, res) => {
        try {
            await roleService.permission(req.body);
            responseUtils.ok(res, "Update success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    }
}

module.exports = roleController