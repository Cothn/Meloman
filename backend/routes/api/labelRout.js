var express = require('express');
const labelController = require("../../controllers/labelController.js");
var labelRouter = express.Router();
const authHelper = require("../../helpers/authHelper");

labelRouter.get('/', labelController.getLabelsByQuery);

labelRouter.post('/', authHelper.checkAuth, authHelper.checkAdmin, labelController.addLabel);

labelRouter.put('/', authHelper.checkAuth, authHelper.checkAdmin, labelController.updateLabel);

labelRouter.delete('/:id', authHelper.checkAuth, authHelper.checkAdmin, labelController.deleteLabel);

module.exports = labelRouter;
