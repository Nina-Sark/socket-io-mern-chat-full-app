const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/UserModel");

const verifyEmail = async (req, res) => {
  const {
    params: { token },
    user : { id }
  } = req;

  const emailVerificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    _id : id,
    emailVerificationToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST);
    throw Error("Email verification token is invalid or has been expired");
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;

  await user.save();

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = verifyEmail;
