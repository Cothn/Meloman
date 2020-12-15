var express = require('express');
const albumController = require("../../controllers/view/albumViewController.js");
var albumRouter = express.Router();



//albumRouter.get("/registration", albumController.createPerson);

albumRouter.get("/", albumController.albumPage);

//albumRouter.get("/edit_profile", albumController.editPerson);


module.exports = albumRouter;
