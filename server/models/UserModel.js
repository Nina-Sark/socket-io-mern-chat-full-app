const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const add = require('date-fns/add')

const dotenv = require("dotenv");

dotenv.config();

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: (props) => "Email is not valid",
      },
    },
    password: {
      type: String,
      validate: {
        validator: (value) => {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
          });
        },
        message: (props) => "Password is not strong enough",
      },
    },
    profilePic: {
      public_id: String,
      url: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: "",
    },
    emailVerificationExpire: {
      type: String,
      default: "",
    },
    passwordResetToken: {
      type: String,
      default: "",
    },
    passwordResetExpire: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserModel.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserModel.methods.createJWT = function () {
  return jwt.sign({ email: this.email, id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserModel.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

UserModel.methods.generateToken = function (tokenKey, expireKey) {
  const token = crypto.randomBytes(20).toString("hex");

  this[tokenKey] = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this[expireKey] = add(new Date(), {
    hours : 2,
    minutes : 30,
    seconds : 100
  })

  return token;
};

const User = mongoose.model("users", UserModel);

module.exports = User;