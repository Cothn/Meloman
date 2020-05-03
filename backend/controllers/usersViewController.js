
exports.createUser = function (request, response){
    response.status(200).redirect("/static/create.html");
};

exports.editUser = function (request, response){
    response.status(200).redirect("/static/edit.html");
};

exports.showUsers = function(request, response){

    response.status(200).redirect("/static/users.html");

};