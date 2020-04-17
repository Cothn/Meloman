var express = require('express');
const userController = require("../controllers/usersController.js");
var userRouter = express.Router();



/* GET users listing. */
userRouter.get('/', userController.showUsers);

userRouter.get('/get', userController.getUsers);

//create View
userRouter.get("/create", userController.createUser);

userRouter.post('/add', userController.addUser);

//edit View
userRouter.get("/edit/:id", userController.editUser);

userRouter.post('/update', userController.updateUser);

userRouter.get('/delete/:id', userController.deleteUser);

module.exports = userRouter;
