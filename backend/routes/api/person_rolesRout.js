var express = require('express');
const person_roleController = require("../../controllers/person_roleController.js");
var person_roleRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

person_roleRouter.get('/', person_roleController.getPerson_rolesByQuery);

person_roleRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin, person_roleController.addPerson_role);

person_roleRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, person_roleController.updatePerson_role);

person_roleRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, person_roleController.deletePerson_role);

module.exports = person_roleRouter;
