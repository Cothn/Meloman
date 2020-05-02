var express = require('express');
const userController = require("../../controllers/usersViewController.js");
var userRouter = express.Router();



/* GET users listing. *///1
userRouter.get('/', userController.showUsers);

userRouter.get('/authenticate', userController.createUser);

//create View!
userRouter.get("/create", userController.createUser);

userRouter.get("/edit/:id", userController.editUser);


module.exports = userRouter;
