const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const usersServices = require("../services/users.service");
const gravatar = require("gravatar");

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
    const avatarURL = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "404",
    });

    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({
      status: "success",
      code: "201",
      data: {
        message: "Registration successful",
        avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "bad request",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

const signout = async (req, res, next) => {
  try {
    await usersServices.logout(req.user);
    res.json({
      status: "success",
      code: 200,
      message: "User signed out",
    });
  } catch (err) {
    next(err);
  }
};

const currentUser = async (req, res, next) => {
  try {
    res.json({
      status: "Success",
      code: 200,
      data: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  signout,
  currentUser,
};
