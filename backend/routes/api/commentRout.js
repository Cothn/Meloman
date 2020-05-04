var express = require('express');
const commentController = require("../../controllers/commentController.js");
var commentRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

commentRouter.get('/', commentController.getCommentsByQuery);

commentRouter.get('/my', authHelper.checkAuth, commentController.getCommentsByQuery);

commentRouter.post('/', authHelper.checkAuth, commentController.addComment);

commentRouter.put('/', authHelper.checkAuth, commentController.updateComment);

commentRouter.delete('/:id', authHelper.checkAuth, commentController.deleteComment);

module.exports = commentRouter;
