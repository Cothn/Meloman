var express = require('express');

const musicController = require("../../controllers/musicController.js");
var musicRouter = express.Router();



musicRouter.post('/', musicController.addTrack);

module.exports = musicRouter;