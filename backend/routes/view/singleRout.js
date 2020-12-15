var express = require('express');
const singleController = require("../../controllers/view/singleViewController.js");
var singleRouter = express.Router();



//singleRouter.get("/registration", singleController.createPerson);

singleRouter.get("/", singleController.singlePage);

//singleRouter.get("/edit_profile", singleController.editPerson);


module.exports = singleRouter;
