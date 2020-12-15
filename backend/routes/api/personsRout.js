var express = require('express');
const personController = require("../../controllers/personsController.js");
var personRouter = express.Router();
const authHelper = require("../../helpers/authHelper");


personRouter.get('/', personController.getPersonsByQuery);

personRouter.get('/roles/:id', personController.getPersonRoles);

personRouter.get('/languages/:id', personController.getPersonLanguages);

personRouter.get('/groups/:id', personController.getPersonGroups);

personRouter.get('/albums/:id', personController.getPersonAlbums);

personRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin,  personController.addPerson);

personRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, personController.updatePerson);

personRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, personController.deletePerson);

var roleRout = require('./person_rolesRout');
personRouter.use('/role', roleRout);

module.exports = personRouter;
