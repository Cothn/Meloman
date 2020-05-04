const logger = require('../configs/logger4jsInit');

exports.createUser = function (request, response){
    response.status(200).sendfile("static/views/create.html");
};

exports.editUser = function (request, response){
    response.status(200).sendfile("static/views/edit.html");
};

exports.showUsers = function(request, response){
    response.status(200).sendfile("static/views/users.html");
};