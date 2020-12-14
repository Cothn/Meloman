var express = require('express');
const personController = require("../../controllers/view/personsViewController.js");
var personRouter = express.Router();



//personRouter.get("/registration", personController.createPerson);

personRouter.get("/", personController.personPage);

//personRouter.get("/edit_profile", personController.editPerson);


module.exports = personRouter;
