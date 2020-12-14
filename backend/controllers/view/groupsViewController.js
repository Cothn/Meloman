const logger = require('../../configs/logger4jsInit');
const path = require('path');
const root_path=path.join(__dirname, '../../static/views');

/*
    exports.createPerson = function (request, response){

        response.status(200).sendFile( 'registration_and_authentication/add_person.html', {root: root_path});
    };

    exports.editPerson = function(request, response){
        response.status(200).sendFile( 'registration_and_authentication/edit_person_page.html', {root: root_path});
    };
*/
exports.groupPage = function(request, response){
    response.status(200).sendFile( 'registration_and_authentication/group_page.html', {root: root_path});
};
