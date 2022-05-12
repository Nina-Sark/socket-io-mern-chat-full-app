const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/UserModel");

const resetPassword = async (req, res) => {
  const {
    params: { token },
    body : { newPassword }
  } = req;
  
  const passwordResetToken = crypto
  .createHash("sha256")
  .update(token)
  .digest("hex")

  const user = await User.findOne({
      passwordResetToken,
      passwordResetExpire : { $gt : Date.now() }
  })

  if(!user) {
      res.status(StatusCodes.BAD_REQUEST)
      throw Error("Password reset token is invalid or has been expired")
  }

  user.password = newPassword;
  user.passwordResetToken = ""
  user.passwordResetExpire = ""

  await user.save()

  res.status(StatusCodes.OK).json({ success : true })
};

module.exports = resetPassword;