const logger = require('../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../static/views');

exports.createUser = function (request, response){
    //logger.debug(path.join(__dirname, '../static/views', 'create.html'));
    response.status(200).sendFile( 'register.html', {root: root_path});
};

exports.editUser = function (request, response){
    response.status(200).sendFile( 'edit.html', {root: root_path});
};

exports.showUsers = function(request, response){
    response.status(200).sendFile( 'users.html', {root: root_path});
};