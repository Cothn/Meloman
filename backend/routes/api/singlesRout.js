var express = require('express');
const singleController = require("../../controllers/singlesController.js");
var singleRouter = express.Router();
const authHelper = require("../../helpers/authHelper");


singleRouter.get('/', singleController.getSinglesByQuery);

singleRouter.get('/persons/:id', singleController.getSinglePersons);

singleRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin,  singleController.addSingle);

singleRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, singleController.updateSingle);

singleRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, singleController.deleteSingle);


module.exports = singleRouter;
