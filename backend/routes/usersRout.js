var express = require('express');
const userController = require("../controllers/usersController.js");
var userRouter = express.Router();



/* GET users listing. */
userRouter.get('/', userController.getUsers);

//create View
userRouter.use("/create", userController.createUser);

userRouter.post('/add', userController.addUser);

userRouter.use("/edit/:id", userController.editUser);

userRouter.post('/update', userController.updateUser);

userRouter.post('/delete/:id', userController.deleteUser);

module.exports = userRouter;
