const express = require("express");
const { validate } = require("kernels/validations");
const router = express.Router();
const categoryController = require("modules/category/controllers/categoryController")
const categoryValidation = require("modules/category/validations/categoryValidation")

router.get("/", categoryController.index)
router.get("/:id", categoryController.detail)
router.get("/detailSlug/:slug", categoryController.detailBySlug)
router.post("/create", validate([categoryValidation.create]), categoryController.create)
router.patch("/edit/:id", categoryController.edit)
router.delete("/delete/:id", categoryController.delete)

module.exports = router;