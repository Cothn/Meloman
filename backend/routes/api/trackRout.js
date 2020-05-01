var express = require('express');
const trackController = require("../../controllers/trackController.js");
var trackRouter = express.Router();


trackRouter.get('/', trackController.getTracks);

trackRouter.post('/', trackController.addTrack);

trackRouter.get("/:id", trackController.getTrackById);

trackRouter.put('/', trackController.updateTrack);

trackRouter.delete('/:id', trackController.deleteTrack);

module.exports = trackRouter;
