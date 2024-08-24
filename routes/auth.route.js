const express = require("express");
const { validate } = require("kernels/validations");
const router = express.Router();
const authController = require("modules/auth/controllers/authController")
const authValidation = require("modules/auth/validations/authValidation")

router.post("/login", validate([authValidation.login]), authController.login)
router.post("/register", validate([authValidation.register]), authController.register)
router.post("/refreshToken", authController.refresh)
router.get("/logout", authController.logout)

module.exports = router;