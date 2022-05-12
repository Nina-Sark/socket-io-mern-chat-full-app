const { Router } = require("express");
const getCurrentUser = require("../controllers/users/getCurrentUser");
const searchUser = require("../controllers/users/search");
const updateProfilePic = require("../controllers/users/updateProfilePic");
const usersRouter = Router();

usersRouter.get("/", searchUser);
usersRouter.get("/currentUser", getCurrentUser);
usersRouter.patch("/currentUser/updateProfilePicture", updateProfilePic);

module.exports = usersRouter;