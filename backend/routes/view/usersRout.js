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

userRouter.get("/playlist_info", userController.playlistInfo);

userRouter.get("/added_playlists", userController.addedPlaylists);

userRouter.get("/favorites_playlists", userController.favoritesPlaylists);

userRouter.get("/create_post", userController.createPost);

userRouter.get("/user_page", userController.userPage);

userRouter.get("/edit_profile", userController.editProfile);

userRouter.get("/extended_search", userController.extendedSearch);

userRouter.get("/equalizer", userController.equalizer);

module.exports = userRouter;
