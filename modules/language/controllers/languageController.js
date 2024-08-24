const responseUtils = require("utils/responseUtils")
const languageService = require("modules/language/services/languageService")

const languageController = {
    index: async (req, res) => {
        const languages = await languageService.list();
        responseUtils.ok(res, languages);
    },

    detail: async (req, res) => {
        const language = await languageService.detail(req.params.id);
        responseUtils.ok(res, language);
    },
    create: async (req, res) => {
        try {
            const language = await languageService.create(req.body);
            responseUtils.ok(res, language)
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    },
    edit: async (req, res) => {
        try {
            await languageService.edit(req.body, req.params.id);
            responseUtils.ok(res, "Update success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }

    },
    delete: async (req, res) => {
        try {
            await languageService.delete(req.params.id)
            responseUtils.ok(res, "Delete success!!!");
        } catch (error) {
            responseUtils.error(res, error.message)
        }
    }
}

module.exports = languageController