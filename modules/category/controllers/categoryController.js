const responseUtils = require("utils/responseUtils")
const categoryService = require("modules/category/services/categoryService")

const categoryController = {
    index: async (req, res) => {
        // Implement your logic
        const categorys = await categoryService.list();
        responseUtils.ok(res, categorys);
    },

    detail: async (req, res) => {
        const category = await categoryService.detail(req.params.id);
        responseUtils.ok(res, category);
    },

    detailBySlug: async (req, res) => {
        const category = await categoryService.detailBySlug(req.params.slug);
        responseUtils.ok(res, category);
    },

    create: async (req, res) => {
        try {
            const category = await categoryService.create(req.body);
            responseUtils.ok(res, category);
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    },

    edit: async (req, res) => {
        try {
            await categoryService.edit(req.body, req.params.id);
            responseUtils.ok(res, "Update success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    },

    delete: async (req, res) => {
        try {
            await categoryService.delete(req.params.id);
            responseUtils.ok(res, "Delete success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    }
}

module.exports = categoryController