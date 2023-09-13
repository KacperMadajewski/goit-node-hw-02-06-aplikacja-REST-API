const User = require("../models/users.model");

const logout = async (id) => {
  try {
    return await User.findByIdAndUpdate({ _id: id }, { $set: { token: null } });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  logout,
};
