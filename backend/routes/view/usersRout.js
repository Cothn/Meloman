var express = require('express');
const userController = require("../../controllers/usersViewController.js");
var userRouter = express.Router();



/* GET users listing. *///1
userRouter.get('/', userController.showUsers);

userRouter.get('/authenticate', userController.authenticateUser);

//create View!
userRouter.get("/create", userController.createUser);

userRouter.get("/edit/:id", userController.editUser);



userRouter.get("/add_track", userController.addTrack);

userRouter.get("/added_tracks", userController.addedTracks);

userRouter.get("/create_playlist", userController.createPlaylist);

userRouter.get("/added_playlists", userController.addedPlaylists);

userRouter.get("/equalizer", userController.equalizer);

module.exports = userRouter;
