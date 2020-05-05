var express = require('express');
const trackController = require("../../controllers/trackController.js");
var trackRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

trackRouter.get('/', trackController.getTracksByQuery);

trackRouter.get('/my', authHelper.checkAuth, trackController.getTracksByQuery);

trackRouter.post('/', authHelper.checkAuth, trackController.addTrack);

trackRouter.put('/', authHelper.checkAuth, trackController.updateTrack);

trackRouter.delete('/:id', authHelper.checkAuth, trackController.deleteTrack);

module.exports = trackRouter;
