var express = require('express');
const user_playlistController = require("../../controllers/user_playlistController.js");
var user_playlistRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

user_playlistRouter.get('/', user_playlistController.getPlayListsByUser);

user_playlistRouter.get('/my', authHelper.checkAuth, user_playlistController.getPlayListsByUser);

user_playlistRouter.post('/', authHelper.checkAuth, user_playlistController.addPlayList);

user_playlistRouter.delete('/:id', authHelper.checkAuth, user_playlistController.deletePlayList);

module.exports = user_playlistRouter;
