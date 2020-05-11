var express = require('express');
const trackController = require("../../controllers/view/trackViewController.js");
var trackRouter = express.Router();


trackRouter.get("/add", trackController.addTrack);

trackRouter.get("/added", trackController.addedTracks);


module.exports = trackRouter;
