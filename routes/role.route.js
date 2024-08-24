const express = require("express");
const { validate } = require("kernels/validations");
const router = express.Router();
const roleController = require("modules/role/controllers/roleController")
const roleValidation = require("modules/role/validations/roleValidation")

router.get("/", roleController.index)
router.post("/create",validate([roleValidation.create]), roleController.create)
router.patch("/edit/:id", roleController.edit)
router.patch("/permission", roleController.permission)
router.delete("/delete/:id", roleController.delete)

module.exports = router;