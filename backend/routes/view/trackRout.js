var express = require('express');
const trackController = require("../../controllers/view/trackViewController.js");
var trackRouter = express.Router();


trackRouter.get("/add_track", trackController.addTrack);

trackRouter.get("/added_tracks", trackController.addedTracks);


module.exports = trackRouter;
