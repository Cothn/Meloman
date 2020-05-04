const logger = require('../configs/logger4jsInit')
const PRIVATE_KEY = require("../configs/token_key").private_key;
var jwt = require('jsonwebtoken');


exports.checkAuth = function(req, res, next) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).send({ message: 'No token provided.' });
    jwt.verify(token, PRIVATE_KEY, function(err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });

        req.currentUser = {user_id : decoded.user_id, role_id: decoded.user_role};
        logger.debug(req.currentUser);
        next();
    });
}

exports.checkAdmin = function(req, res, next) {
    logger.debug("CheckAdmin");
    if (req.currentUser.role_id < 2) {
        next();
    }
    else
    {
        return res.status(400).send({ message: 'Access denied.' });
    }
}