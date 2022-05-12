const { StatusCodes } = require("http-status-codes");
const User = require("../../models/UserModel");

const getCurrentUser = async (req, res) => {
  const { id } = req.user;

  const currentUser = await User.findById(id).select("-password")

  res.status(StatusCodes.OK).json({ user: currentUser });
};

module.exports = getCurrentUser;