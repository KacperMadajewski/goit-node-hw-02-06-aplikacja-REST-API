const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.controller");
const auth = require("../../middlewares/auth");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", auth, authController.signout);
router.get("/current", auth, authController.currentUser);

module.exports = router;
