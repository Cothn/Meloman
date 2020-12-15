const logger = require('../../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../../static/views');

/*
    exports.createPerson = function (request, response){

        response.status(200).sendFile( 'registration_and_authentication/add_album.html', {root: root_path});
    };

    exports.editPerson = function(request, response){
        response.status(200).sendFile( 'registration_and_authentication/edit_album_page.html', {root: root_path});
    };
*/
exports.albumPage = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/album_page.html', {root: root_path});
};
