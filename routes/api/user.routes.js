const express = require("express");
const router = express.Router();
const authController = require("../../controller/user.controller");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");
const uploadCOntroller = require("../../controller/upload.controller");
const emailController = require("../../controller/email.controller");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", auth, authController.signout);
router.get("/current", auth, authController.currentUser);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  uploadCOntroller.updateAvatar
);
router.get("/verify/:verificationToken", emailController.verifyEmail);

module.exports = router;
