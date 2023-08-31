const User = require("../models/users.model");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({
      status: "success",
      code: "201",
      data: { user: newUser },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
};
