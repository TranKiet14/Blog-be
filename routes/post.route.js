const express = require("express");
const multer = require("multer");
const router = express.Router();
const postController = require("modules/post/controllers/postController")
const uploadCloud = require("kernels/middlewares/uploadCloud.middleware")
const upload = multer();

router.get("/", postController.index)
router.get("/:id", postController.detail)
router.get("/detail/:slug", postController.detailSlug)
router.post("/create", upload.single("thumbnail"), uploadCloud.upload, postController.create)
router.patch("/edit/:id", upload.single("thumbnail"), uploadCloud.upload, postController.edit)
router.delete("/delete/:id", postController.delete)

module.exports = router;