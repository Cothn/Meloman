var express = require('express');
const postController = require("../../controllers/postController.js");
var postRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

postRouter.get('/', postController.getPostsByQuery);

postRouter.get('/my', authHelper.checkAuth, postController.getPostsByQuery);

postRouter.post('/', authHelper.checkAuth, postController.addPost);

postRouter.put('/', authHelper.checkAuth, postController.updatePost);

postRouter.delete('/:id', authHelper.checkAuth, postController.deletePost);

module.exports = postRouter;
