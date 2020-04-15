var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const logger = require('../configs/logger4jsInit')
const mySqlConfig = require("../configs/mysqlconfig");

/* GET home page.
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Express' });
});
*/
router.get('/', function(request, response, next) {
  response.send('Hallo Admin!');
  var connection = mysql.createConnection(mySqlConfig.config);
  connection.query("SELECT * FROM USER_ROLE", {}, function (err, results) {
    if (err) {
      return logger.error("Ошибка: " + err.message);
    }
    else{
      logger.info("Подключение к серверу MySQL прошло успешно");
    }
    logger.debug('results: ');
    logger.debug(results.valueOf());
    results.map(function (value) {
      logger.debug('value: ' +value.name);
    });
  });

  logger.debug('mySqlConfig: ');
  logger.debug(mySqlConfig);
});

module.exports = router;
