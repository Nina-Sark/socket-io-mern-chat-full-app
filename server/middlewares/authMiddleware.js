require("express-async-errors");
const dotenv = require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const tokenStr = req.headers.auth;

  if (!tokenStr) {
    res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED);
    throw Error("Authentication invalid");
  }

  const token = tokenStr.split(" ")[1];

  if (!token) {
    res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED);
    throw Error("Authentication invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw Error("Authentication invalid");
  }
};

module.exports = auth;
