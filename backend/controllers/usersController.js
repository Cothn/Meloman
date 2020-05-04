const User = require("../models/user.js");
const logger = require('../configs/logger4jsInit');
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");
const bcrypt = require('bcrypt');
const PRIVATE_KEY = require("../configs/token_key").private_key;
const expirationTime = 3600;
var jwt = require('jsonwebtoken');

exports.getUserMe = function (request, response){
    var id = request.currentUser.user_id;
    if((request.currentUser.role_id < 2) && (request.query.id)){
        id = request.query.id;//  params.id;
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(User.GET_USER_BY_ID, [id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        logger.debug("get_User_by_id:")
        logger.debug(  data[0]);
        if(data.length == 0)
        {
            return response.status(400).send({message: "user not found"});
        }
        return response.status(200).send(data[0]);
    });
    connection.end();
};

exports.authenticateUser = function (request, response){

    const email = request.body.email;
    const password = request.body.password;
    //logger.debug( id);
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(User.GET_USER_BY_EMAIL, [email], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };

        if(data.length == 0)
        {
            return response.status(400).send(
                {message: "email or password incorrect!"});
        }
        else
        {
            const passwordEntity = bcrypt.hashSync(password, data[0].salt);

            if(passwordEntity != data[0].password)
            {
                return response.status(400).send({message: "email or password incorrect!"});
            }
            else{
                logger.debug(data[0]);

                const token = jwt.sign({
                    user_id :  data[0].id,
                    user_role: data[0].role_id }, PRIVATE_KEY,
                    {
                    algorithm: 'HS256',
                    expiresIn: expirationTime
                });
                return response.status(200).send({token: token, exp: expirationTime});
            }
        }
    });
    connection.end();
};


exports.getUsers = function(request, response){
    //logger.debug( "mess1");
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(User.GET_ALL_USERS, function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.updateUser = function(request, response) {
    if(!request.body) return response.status(400).send(
        { message: "null request body"});
    if(!request.body.password) return response.status(400).send(
        { message: "password must be not null"});

    var id = request.currentUser.user_id;
    if(request.currentUser.role_id < 2) {
        id = request.params.id;
    }
    const name = request.body.name;
    const surname= request.body.surname;
    const nickname = request.body.nickname;
    const email = request.body.email;
    const salt= bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(request.body.password, salt);
    const music_avatar_id= request.body.music_avatar_id;

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(User.UPDATE_USER,
        [name, surname, nickname, email, password, salt, music_avatar_id,  id], function(err, data) {
            if(err) {
                return response.status(400).send({ message: err.message});
            };
            //logger.debug( "mess4");
            //logger.debug(    data);
            return response.sendStatus(200);
        });
    connection.end();
    //response.status(200).send('true');
};

exports.deleteUser = function(request, response){
    const user_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(User.DELETE_USER_BY_ID, [user_id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.sendStatus(200);
    });
    connection.end();
};



exports.registerUser= function(request, response){

    if(!request.body) return response.sendStatus(400);
    const nickname = request.body.nickname;
    const email = request.body.email;

    const salt= bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(request.body.password, salt);

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( User.ADD_USER,
        [nickname, email, password, salt], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(201).send({insert_id:  data.insertId});

        });
    connection.end();

};