const User = require("../models/users.model");


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
    message: "Verification successful",
  });
};

module.exports = {
  verifyEmail,
};
