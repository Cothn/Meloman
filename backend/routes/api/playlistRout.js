var express = require('express');
const playlistController = require("../../controllers/playlistController.js");
var playlistRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

playlistRouter.get('/', playlistController.getPlayListsByQuery);

playlistRouter.get('/tracks/:id', playlistController.getPlayListsTracks);

playlistRouter.get('/my', authHelper.checkAuth, playlistController.getPlayListsByQuery);

playlistRouter.post('/', authHelper.checkAuth, playlistController.addPlayList);

playlistRouter.post('/tracks/:id', authHelper.checkAuth, playlistController.addTrack);

playlistRouter.put('/', authHelper.checkAuth, playlistController.updatePlayList);

playlistRouter.delete('/:id', authHelper.checkAuth, playlistController.deletePlayList);

var favouriteRout = require('./user_playlistRout');
playlistRouter.use('/favorite', favouriteRout);

module.exports = playlistRouter;
