const { StatusCodes } = require("http-status-codes");
const User = require("../../models/UserModel");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST);
    throw Error("Email or password is wrong");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    res.status(StatusCodes.BAD_REQUEST);
    throw Error("Email or password is wrong");
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({
      user : {
        _id : user.id,
        name : user.name,
        email : user.email,
        profilePic : user.profilePic,
        emailVerified : user.emailVerified
      },
      token,
    });
};

module.exports = loginController;
