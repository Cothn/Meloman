
exports.createUser = function (request, response){
    response.status(200).render("create.hbs");
};

exports.editUser = function (request, response){
    response.status(200).render("edit.hbs");
};

exports.showUsers = function(request, response){

    response.status(200).redirect("/users.html")
    //render("users.hbs");

};