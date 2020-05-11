const logger = require('../../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../../static/views');

exports.createPost = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/create_post_page.html', {root: root_path});
};

exports.extendedSearch = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/extended_search_page.html', {root: root_path});
};

exports.equalizer = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/equalizer_page.html', {root: root_path});
};