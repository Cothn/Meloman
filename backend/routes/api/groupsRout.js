var express = require('express');
const groupController = require("../../controllers/groupsController.js");
var groupRouter = express.Router();
const authHelper = require("../../helpers/authHelper");


groupRouter.get('/', groupController.getGroupsByQuery);

groupRouter.get('/genres/:id', groupController.getGroupGenres);

groupRouter.get('/languages/:id', groupController.getGroupLanguages);

groupRouter.get('/persons/:id', groupController.getGroupPersons);

groupRouter.get('/albums/:id', groupController.getGroupAlbums);

groupRouter.get('/singles/:id', groupController.getGroupSingles);

groupRouter.get('/labels/:id', groupController.getGroupLabels);

groupRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin,  groupController.addGroup);

groupRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, groupController.updateGroup);

groupRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, groupController.deleteGroup);


module.exports = groupRouter;
