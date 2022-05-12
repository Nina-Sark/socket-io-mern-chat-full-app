const { StatusCodes } = require("http-status-codes");
const User = require("../../models/UserModel");

const searchUser = async (req, res) => {
  const { keyword } = req.query;
  let objectQuery = {};

  if (keyword) {
    objectQuery = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
    };
  }

  const users = await User.find(objectQuery).find({
    _id: { $not: { $eq: req.user.id } },
  });

  res.status(StatusCodes.OK).json({ users });
};

module.exports = searchUser;