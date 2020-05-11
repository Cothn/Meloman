var express = require('express');
const userController = require("../../controllers/view/usersViewController.js");
var userRouter = express.Router();


/* GET users listing. *///1
//userRouter.get('/users', userController.showUsers);

userRouter.get("/registration", userController.createUser);

userRouter.get("/", userController.userPage);

userRouter.get("/edit_profile", userController.editProfile);


module.exports = userRouter;
