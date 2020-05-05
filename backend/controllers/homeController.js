const mysql = require("mysql2");
const mySqlConfig = require("../configs/mysqlconfig");
const logger = require('../configs/logger4jsInit')

exports.index = function(request, response) {

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

    response.send("Hallo Admin!");
}