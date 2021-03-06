const logger = require('../../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../../static/views');

exports.createUser = function (request, response){

    response.status(200).sendFile( 'registration_and_authentication/register.html', {root: root_path});
};

exports.authenticateUser = function (request, response) {
	response.status(200).sendFile( 'registration_and_authentication/sign_in.html', {root: root_path});
};


exports.showUsers = function(request, response){
    response.status(200).sendFile( 'users.html', {root: root_path});
};

exports.userPage = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/user_page.html', {root: root_path});
};

exports.editProfile = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/edit_profile_page.html', {root: root_path});
};

exports.getMain = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/main_page.html', {root: root_path});
};

exports.getGuest = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/guest_page.html', {root: root_path});
};