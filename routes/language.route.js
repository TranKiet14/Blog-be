const express = require("express");
const multer = require("multer");
const { validate } = require("kernels/validations");
const router = express.Router();
const languageController = require("modules/language/controllers/languageController")
const languageValidation = require("modules/language/validations/languageValidation")
const uploadCloud = require("kernels/middlewares/uploadCloud.middleware")
const upload = multer();

router.get("/", languageController.index)
router.get("/:id", languageController.detail)
router.post("/create", upload.single("flag"), uploadCloud.upload, validate([languageValidation.create]),  languageController.create)
router.patch("/edit/:id", upload.single("flag"), uploadCloud.upload, languageController.edit)
router.delete("/delete/:id", languageController.delete)

module.exports = router;