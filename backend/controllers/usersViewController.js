
exports.createUser = function (request, response){
    response.render("create.hbs");
};

exports.editUser = function (request, response){
    response.render("edit.hbs");
};

exports.showUsers = function(request, response){

    response.render("users.hbs");

};