require("express-async-errors");

const { Router } = require("express");
const getResetPasswordToken = require("../controllers/auth/getResetPasswordToken");
const generateVerifyEmailToken = require("../controllers/auth/getVerifyEmailToken");
const loginController = require("../controllers/auth/login");
const resetPassword = require("../controllers/auth/resetPassword");
const signupController = require("../controllers/auth/signup");
const verifyEmail = require("../controllers/auth/verifyEmail");
const logout = require("../controllers/auth/logout");
const auth = require("../middlewares/authMiddleware");
const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.get("/emailverificationtoken", auth, generateVerifyEmailToken)
authRouter.get("/verifyemail/:token", auth, verifyEmail)
authRouter.patch("/forgotpassword", getResetPasswordToken)
authRouter.patch("/resetpassword/:token", resetPassword)
authRouter.patch("/logout", auth, logout)

module.exports = authRouter;
