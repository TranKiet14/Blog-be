const responseUtils = require("utils/responseUtils")
const uploadService = require("modules/upload/services/uploadService")
const uploadController = {
    index: async (req, res) => {
        const data = await uploadService.upload(req.body)
        res.json({
            location: data
        })
    },
}
module.exports = uploadController