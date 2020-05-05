var express = require('express');

const musicController = require("../../controllers/musicController.js");
var musicRouter = express.Router();
const authHelper = require("../../helpers/authHelper");


musicRouter.post('/', authHelper.checkAuth, musicController.addTrack);

module.exports = musicRouter;