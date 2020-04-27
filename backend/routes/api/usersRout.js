var express = require('express');
const userController = require("../../controllers/usersController.js");
var userRouter = express.Router();


userRouter.get('/get', userController.getUsers);

userRouter.post('/add', userController.addUser);

userRouter.get("/get/:id", userController.getUserById);

userRouter.post('/update', userController.updateUser);

userRouter.get('/delete/:id', userController.deleteUser);

module.exports = userRouter;
