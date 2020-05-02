const User = require("../models/user.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");
const PRIVATE_KEY = require("../configs/token_key").private_key;
var jwt = require('jsonwebtoken');


exports.checkAuth = function(req, res, next) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).send({ message: 'No token provided.' });
    jwt.verify(token, PRIVATE_KEY, function(err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });

        logger.debug("CheckAuth");
        const connection = mysql.createConnection(mySqlConfig.config);
        connection.query(User.GET_USER_BY_ID, [decoded.user_id], function (err, data) {
            if (err) {
                return res.status(401).send({message: err.message});
            };
            logger.debug("get_User_by_id:")
            logger.debug(data[0]);
            if (data.length == 0) {
                return res.status(401).send({message: "user not found"});
            } else {
                req.currentUser = data[0];
                next();
            }
        });
        connection.end();
    });
}

exports.checkAdmin = function(req, res, next) {
    logger.debug("CheckAdmin");
    if (req.currentUser.role_id < 2) {
        next();
    }
    else
    {
        return res.redirect('/view/user/authenticate');
    }
}