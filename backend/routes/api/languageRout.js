var express = require('express');
const languageController = require("../../controllers/languageController.js");
var languageRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

languageRouter.get('/', languageController.getLanguagesByQuery);

languageRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin, languageController.addLanguage);

languageRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, languageController.updateLanguage);

languageRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, languageController.deleteLanguage);

module.exports = languageRouter;
