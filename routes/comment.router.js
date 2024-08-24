const express = require("express");
const { validate } = require("kernels/validations");
const router = express.Router();
const commentControllers = require("modules/comment/controllers/commentController")

router.post("/create", commentControllers.create)

module.exports = router;