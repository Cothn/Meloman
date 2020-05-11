var express = require('express');
const otherController = require("../../controllers/view/otherViewController.js");
var otherRouter = express.Router();


otherRouter.get("/post/create_post", otherController.createPost);

otherRouter.get("/extended_search", otherController.extendedSearch);

otherRouter.get("/equalizer", otherController.equalizer);

module.exports = otherRouter;
