const { StatusCodes } = require("http-status-codes");
const User = require("../../models/UserModel");
const sendMail = require("../../utils/sendEmail");

const generateVerifyEmailToken = async (req, res) => {
  const user = await User.findById(req.user.id);
  const verifyEmailToken = await user.generateToken(
    "emailVerificationToken",
    "emailVerificationExpire"
  );

  await user.save();

  const verifyEmailTokenURL = `https://socketio-mern-chat-app.netlify.app/user/${req.user.id}/email_verification_token/${verifyEmailToken}`;

  const message = `Hi, ${user.name}!\n\nYou email verification token - ${verifyEmailTokenURL}\n\nIf you haven't requested it, feel free to ignore it.\n\nThank you! Have a nice day, ${user?.name}!`;

  try {
    await sendMail({
      email: user?.email,
      subject: "Verify Your Email",
      message,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message:
        "Email verification token was sent to your email. Please check it!",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};

module.exports = generateVerifyEmailToken;
