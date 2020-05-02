var express = require('express');
const userController = require("../../controllers/usersController.js");
var userRouter = express.Router();
const authHelper = require("../../helpers/authHelper")


userRouter.get('/', authHelper.checkAuth, authHelper.checkAdmin, userController.getUsers);

userRouter.post('/register', userController.registerUser);

userRouter.post('/authenticate', userController.authenticateUser);

userRouter.get("/:id", userController.getUserById);

userRouter.put('/', userController.updateUser);

userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
