const User = require("../../models/UserModel");
const cloudinary = require("cloudinary");
const { StatusCodes } = require("http-status-codes");

const updateProfilePic = async (req, res) => {
  const {
    body: { picture },
    user: { id },
  } = req;

  const user = await User.findById(id);

  await cloudinary.v2.uploader.destroy(user?.profilePic?.public_id);

  const profile_pic = await cloudinary.v2.uploader.upload(picture, {
    folder: "profile_images",
    width: 150,
    crop: "scale",
  });

  user.profilePic = {
    public_id: profile_pic.public_id,
    url: profile_pic.secure_url,
  };

  await user.save();

  res.status(StatusCodes.OK).json({
    profilePic: {
      public_id: profile_pic.public_id,
      url: profile_pic.secure_url,
    },
  });
};

module.exports = updateProfilePic;
