var express = require('express');
const countrieController = require("../../controllers/countrieController.js");
var countrieRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

countrieRouter.get('/', countrieController.getCountriesByQuery);

countrieRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin, countrieController.addCountrie);

countrieRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, countrieController.updateCountrie);

countrieRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, countrieController.deleteCountrie);

module.exports = countrieRouter;
