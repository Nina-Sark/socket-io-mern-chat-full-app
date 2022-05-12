const { StatusCodes } = require("http-status-codes");
const User = require("../../models/UserModel");
const cloudinary = require("cloudinary");

const signupController = async (req, res) => {
  const { name, email, password, picture } = req.body;

  const alreadyHasAccount = await User.exists({ email });

  if (alreadyHasAccount) {
    res.status(StatusCodes.BAD_REQUEST);
    throw Error("User with this email already has an account");
  }

  const cloud = await cloudinary.v2.uploader.upload(picture, {
    folder: "profile_images",
  });

  const newUser = await User.create({
    name,
    email,
    password,
    profilePic: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  })

  const user = await User.findById(newUser._id).select("-password")

  const token = newUser.createJWT();

  res.status(StatusCodes.CREATED).json({ user, token });
};

module.exports = signupController;