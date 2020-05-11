var express = require('express');
const playlistController = require("../../controllers/view/playlistViewController.js");
var playlistRouter = express.Router();


playlistRouter.get("/create", playlistController.createPlaylist);

playlistRouter.get("/playlist_info", playlistController.playlistInfo);

playlistRouter.get("/added", playlistController.addedPlaylists);

playlistRouter.get("/favorites", playlistController.favoritesPlaylists);


module.exports = playlistRouter;
