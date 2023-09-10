const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.controller");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);
router.post("/current", authController.currentUser);

module.exports = router;
