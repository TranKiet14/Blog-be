const express = require("express");
const multer = require("multer");
const router = express.Router();
const userController = require("modules/user/controllers/userController")
const uploadCloud = require("kernels/middlewares/uploadCloud.middleware")
const upload = multer();

router.get("/", userController.index)
router.get("/:id", userController.detail)
router.post("/create", upload.single("avatar"), uploadCloud.upload, userController.create)
router.patch("/edit/:id", upload.single("avatar"), uploadCloud.upload, userController.edit)
router.delete("/delete/:id", userController.delete)

module.exports = router;