const logger = require('../../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../../static/views');


exports.addTrack = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/add_track_page.html', {root: root_path});
};

exports.addedTracks = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/added_tracks_page.html', {root: root_path});
};



exports.createPlaylist = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/create_playlist_page.html', {root: root_path});
};

exports.playlistInfo = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/playlist_info_page.html', {root: root_path});
};

exports.addedPlaylists = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/added_playlists_page.html', {root: root_path});
};

exports.favoritesPlaylists = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/favorites_playlists_page.html', {root: root_path});
};



exports.createPost = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/create_post_page.html', {root: root_path});
};

exports.extendedSearch = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/extended_search_page.html', {root: root_path});
};

exports.equalizer = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/equalizer_page.html', {root: root_path});
};