var express = require('express');
const likeController = require("../../controllers/likeController.js");
var likeRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

likeRouter.get('/:id', likeController.getLikesFromPost);

likeRouter.get('/:id/my', authHelper.checkAuth, likeController.getLikesFromPost);

likeRouter.post('/', authHelper.checkAuth, likeController.addLikeToPost);

likeRouter.delete('/:id', authHelper.checkAuth, likeController.deleteLikeFromPost);

module.exports = likeRouter;
