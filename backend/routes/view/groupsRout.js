var express = require('express');
const groupController = require("../../controllers/view/groupsViewController.js");
var groupRouter = express.Router();



//groupRouter.get("/registration", groupController.creategroup);

groupRouter.get("/", groupController.groupPage);

//groupRouter.get("/edit_profile", groupController.editgroup);


module.exports = groupRouter;
