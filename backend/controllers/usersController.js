const User = require("../models/user.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");

let connection = mysql.createConnection(mySqlConfig.config);

exports.createUser = function (request, response){
    response.render("create.hbs");
};

exports.editUser = function (request, response){
    const id = request.params.id;
    response.render("edit.hbs");
    //connection.query(User.GET_USER_BY_ID, [id], function(err, data) {
    //    if(err) return console.log(err);
        //response.render("edit.hbs", {
       //     user: data[0]
        //});

    //e});
};

exports.getUserById = function (request, response){
    const id = request.params.id;
    //logger.debug( id);
    connection.query(User.GET_USER_BY_ID, [id], function(err, data) {
        if(err) {
            return response.send({status : false, dbresp: err.toString()});
        };
        //logger.debug(  { users:  data[0]});
        //response.render("users.hbs", { users:  data});
        response.send({status : true,  db_data:  data});
    });
};

exports.showUsers = function(request, response){

    response.render("users.hbs");

};

exports.getUsers = function(request, response){
    //logger.debug( "mess1");
    connection.query(User.GET_ALL_USERS, function(err, data) {
        if(err) {
            return response.send({status : false, dbresp: err.toString()});
        };
        //logger.debug(  { users:  data});
        //response.render("users.hbs", { users:  data});
        response.send({status : true,  db_data:  data});
    });

};

exports.updateUser = function(request, response) {
    if(!request.body) return response.sendStatus(400);

    const id = request.body.id;
    const name = request.body.name;
    const surname= request.body.surname;
    const nickname = request.body.nickname;
    const login = request.body.login;
    const password = request.body.password;
    const role_id= 1;
    const music_avatar_id= request.body.music_avatar_id;
    logger.debug( "mess3");
    //logger.debug(  id);
    connection.query(User.UPDATE_USER,
        [name, surname, nickname, login, password, role_id,  music_avatar_id,  id], function(err, data) {
            if(err) {
                return response.send({status : false, dbresp: err.toString()});
            };
            //logger.debug( "mess4");
            //logger.debug(    data);
            response.send({status : true});
        });
    //response.send('true');
};

exports.deleteUser = function(request, response){
    const user_id= request.params.id;
    connection.query(User.DELETE_USER_BY_ID, [user_id], function(err, data) {
        if(err) {
            return response.send({status : false, dbresp: err.toString()});
        };
        response.send({status : true});
    });
};


exports.addUser= function(request, response){
    if(!request.body) return response.sendStatus(400);
    const name = request.body.name;
    const surname= request.body.surname;
    const nickname = request.body.nickname;
    const login = request.body.login;
    const password = request.body.password;
    const role_id= 1;
    const music_avatar_id= request.body.music_avatar_id;
    connection.query( User.ADD_USER
        , [name, surname, nickname, login, password, role_id, music_avatar_id], function(err, data) {
            if(err) {
                return response.send({status : false, dbresp: err.toString()});
            };
            //logger.debug(    data);
            response.send({status : true,  insert_id:  data.insertId});
        });
};