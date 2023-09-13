const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const updateAvatar = async (req, res, next) => {
  try {
    const uploadedFile = req.file;
    const avatar = await Jimp.read(uploadedFile.path);
    await avatar.cover(250, 250).write(uploadedFile.path);
    const newFileName = `avatar${req.user._id}.${
      uploadedFile.mimetype.split("/")[1]
    }`;
    const newPath = path.join(__dirname, `../public/avatars/${newFileName}`);
    await fs.rename(uploadedFile.path, newPath);
    const avatarURL = `/avatars/${newFileName}`;
    res.status(200).json({
      status: "success",
      code: 200,
      avatarURL,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateAvatar,
};
