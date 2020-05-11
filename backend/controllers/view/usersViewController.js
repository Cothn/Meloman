const logger = require('../../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../../static/views/registration_and_authentication');

const PRIVATE_KEY = require("../../configs/token_key").private_key;
var jwt = require('jsonwebtoken');

exports.createUser = function (request, response){

    response.status(200).sendFile( 'register.html', {root: root_path});
};

exports.authenticateUser = function (request, response) {
	response.status(200).sendFile( 'sign_in.html', {root: root_path});
};


//exports.showUsers = function(request, response){
//    response.status(200).sendFile( '../users.html', {root: root_path});
//};

exports.userPage = function(request, response){
    response.status(200).sendFile( 'user_page.html', {root: root_path});
};

exports.editProfile = function(request, response){
    response.status(200).sendFile( 'edit_profile_page.html', {root: root_path});
};

exports.getMain= function(request, response){
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = request.headers.authorization.split(' ')[1];
    }
    logger.debug("Start deshifr");
    if (!token) return  response.status(200).sendFile('guest_page.html', {root: root_path});
    logger.debug("Start deshifr");
    jwt.verify(token, PRIVATE_KEY, function(err, decoded) {
        if (err) return  response.status(200).sendFile('guest_page.html', {root: root_path});
        logger.debug("main_page.html");
        return response.status(200).sendFile('main_page.html', {root: root_path});
    });
};