const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const usersServices = require("../services/users.service");

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
      data: {
        message: "Registration successful",
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
    const current = req.user;
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        current,
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
