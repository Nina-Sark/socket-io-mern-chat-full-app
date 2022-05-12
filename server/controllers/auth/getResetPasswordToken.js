const { StatusCodes } = require("http-status-codes");
const User = require("../../models/UserModel");
const crypto = require("crypto");
const sendMail = require("../../utils/sendEmail");

const getResetPasswordToken = async (req, res) => {
  const {
    body: { email },
  } = req;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND);
    throw Error("User with this email not found");
  }

  const passwordResetToken = await user.generateToken(
    "passwordResetToken",
    "passwordResetExpire"
  );
  const message = `Here is your password reset token url - https://socketio-mern-chat-app.netlify.app/passwordreset/${passwordResetToken}\n\nIf you haven't requested it, feel free to ignore it`;

  await user.save();

  try {
    await sendMail({
      email,
      subject: "Password Reset",
      message,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Password reset token was successfuly sent to your email.",
    });
  } catch (err) {
    user.passwordResetToken = "";
    user.passwordResetExpire = "";

    await user.save();

    res.status(StatusCodes.BAD_REQUEST);
    throw Error(err?.message);
  }
};

module.exports = getResetPasswordToken;