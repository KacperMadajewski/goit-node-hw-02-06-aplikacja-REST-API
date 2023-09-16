const User = require("../models/users.model");
const sendEmail = require("../services/email.service");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.json({
      status: "Not Found",
      code: 404,
      message: "User not found",
    });
  }
  user.verificationToken = null;
  user.verify = true;
  await user.save();
  return res.json({
    status: "OK",
    code: 200,
    message: "Congrats! Verification successful",
  });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      status: "Error",
      code: 400,
      message: "Missing required field email",
    });
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    return res.json({
      status: "Error",
      code: 400,
      message: "Verification already completed",
      data: "Bad Request",
    });
  }
  const verificationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/users/verify/${user.verificationToken}`;
  sendEmail({
    to: email,
    link: verificationLink,
  });
  return res.json({
    status: "OK",
    code: 200,
    message: "Verification email resent",
  });
};

module.exports = {
  verifyEmail,
  resendVerificationEmail,
};
