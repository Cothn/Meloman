var express = require('express');
const albumController = require("../../controllers/albumsController.js");
var albumRouter = express.Router();
const authHelper = require("../../helpers/authHelper");


albumRouter.get('/', albumController.getAlbumsByQuery);

albumRouter.get('/genres/:id', albumController.getAlbumGenres);

albumRouter.get('/languages/:id', albumController.getAlbumLanguages);

albumRouter.get('/persons/:id', albumController.getAlbumPersons);

albumRouter.get('/groups/:id', albumController.getAlbumGroups);

albumRouter.get('/tracks/:id', albumController.getAlbumTracks);

albumRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin,  albumController.addAlbum);

albumRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, albumController.updateAlbum);

albumRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, albumController.deleteAlbum);


module.exports = albumRouter;
