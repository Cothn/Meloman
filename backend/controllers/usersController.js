const User = require("../models/user.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");

let connection = mysql.createConnection(mySqlConfig.config);

exports.getUserById = function (request, response){
    const id = request.params.id;
    //logger.debug( id);
    connection.query(User.GET_USER_BY_ID, [id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        //logger.debug(  { users:  data[0]});
        return response.status(200).send(data);
    });
};


exports.getUsers = function(request, response){
    //logger.debug( "mess1");
    connection.query(User.GET_ALL_USERS, function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        //logger.debug(  { users:  data});
        //response.render("users.hbs", { users:  data});
        //return response.status(400).send({message: "mm"});
        return response.status(200).send(data);
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
    //logger.debug( "mess3");
    //logger.debug(  id);
    connection.query(User.UPDATE_USER,
        [name, surname, nickname, login, password, role_id,  music_avatar_id,  id], function(err, data) {
            if(err) {
                return response.status(400).send({ message: err.message});
            };
            //logger.debug( "mess4");
            //logger.debug(    data);
            return response.sendStatus(200);
        });
    //response.status(200).send('true');
};

exports.deleteUser = function(request, response){
    const user_id= request.params.id;
    connection.query(User.DELETE_USER_BY_ID, [user_id], function(err, data) {
        if(err) {
            return response.send({message: err.message});
        };
        return response.sendStatus(200);
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
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(200).send({insert_id:  data.insertId});
        });
};