var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const logger = require('../configs/logger4jsInit')
const mySqlConfig = require("../configs/mysqlconfig");
const homeController = require("../controllers/homeController.js");

/* GET home page.
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Express' });
});
*/
router.get('/', homeController.index);

module.exports = router;
