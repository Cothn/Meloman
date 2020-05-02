var express = require('express');
const userController = require("../../controllers/usersController.js");
var userRouter = express.Router();
const authHelper = require("../../helpers/authHelper");


userRouter.get('/', authHelper.checkAuth, authHelper.checkAdmin, userController.getUsers);

userRouter.post('/register',  userController.registerUser);

userRouter.post('/authenticate', userController.authenticateUser);

userRouter.get("/me", authHelper.checkAuth, userController.getUserMe);

userRouter.put('/me', authHelper.checkAuth, userController.updateUser);

userRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, userController.deleteUser);

module.exports = userRouter;
