const User = require("../models/users.model");

const updateAvatarUrl = async (id, avatarURL) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { avatarURL },
      { new: true }
    );
    return updatedUser;
  } catch (err) {
    console.error(err);
  }
};

module.exports = updateAvatarUrl;
