const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("modules/upload/controllers/uploadController")
const uploadCloud = require("kernels/middlewares/uploadCloud.middleware")
const upload = multer();

router.post(
    "/",
    upload.single("file"),
    uploadCloud.upload,
    controller.index
);

module.exports = router;