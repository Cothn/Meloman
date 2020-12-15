const logger = require('../../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../../static/views');

/*
    exports.createPerson = function (request, response){

        response.status(200).sendFile( 'registration_and_authentication/add_single.html', {root: root_path});
    };

    exports.editPerson = function(request, response){
        response.status(200).sendFile( 'registration_and_authentication/edit_single_page.html', {root: root_path});
    };
*/
exports.singlePage = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/single_page.html', {root: root_path});
};
