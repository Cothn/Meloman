var express = require('express');
const genreController = require("../../controllers/genreController.js");
var genreRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

genreRouter.get('/', genreController.getGenresByQuery);

genreRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin, genreController.addGenre);

genreRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, genreController.updateGenre);

genreRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, genreController.deleteGenre);

module.exports = genreRouter;
