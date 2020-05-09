const logger = require('../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../static/views');

exports.createUser = function (request, response){
    //logger.debug(path.join(__dirname, '../static/views', 'create.html'));
    response.status(200).sendFile( 'registration_and_authentication/register.html', {root: root_path});
};

exports.authenticateUser = function (request, response) {
	response.status(200).sendFile( 'registration_and_authentication/sign_in.html', {root: root_path});
};

exports.editUser = function (request, response){
    response.status(200).sendFile( 'edit.html', {root: root_path});
};

exports.showUsers = function(request, response){
    response.status(200).sendFile( 'users.html', {root: root_path});
};


exports.addTrack = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/add_track_page.html', {root: root_path});
};

exports.addedTracks = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/added_tracks_page.html', {root: root_path});
};

exports.createPlaylist = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/create_playlist_page.html', {root: root_path});
};

exports.addedPlaylists = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/added_playlists_page.html', {root: root_path});
};

exports.equalizer = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/equalizer_page.html', {root: root_path});
};