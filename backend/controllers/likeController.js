const Like = require("../models/like.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getLikesFromPost = function (request, response){
    const post_id = request.params.id;
    if(!post_id)
    {
        return response.status(400).send({message: "Field post_id must be not null"});
    }
    var sqlRequest = Like.GET_USERS_ID_BY_POST_ID;
    var sqlParams = [post_id];
    if(request.currentUser){
        sqlRequest += ' AND ';
        sqlRequest += ' user_id=?';
        var user_id = request.currentUser.user_id;
        if((request.currentUser.role_id < 2))
        {
            if(request.query.user_id) {
                user_id = request.query.user_id;
            }
        }
        sqlParams = sqlParams.concat([user_id]);
    }

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(sqlRequest);
    connection.query(sqlRequest, sqlParams, function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });

};

exports.deleteLikeFromPost = function(request, response){
    var user_id = request.currentUser.user_id;
    const post_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Like.DELETE_LIKE_BY_PK;
    if((request.currentUser.role_id < 2))
    {
        if(request.query.user_id) {
            user_id = request.query.user_id;
        }
    }

    connection.query(sqlRequest, [user_id, post_id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "like not found"});
        }
        logger.debug(data);
        return response.sendStatus(200);
    });
    connection.end();
};


exports.addLikeToPost = function(request, response){
    const post_id= request.body.post_id;
    var user_id = request.currentUser.user_id;
    if((request.currentUser.role_id < 2))
    {
        if(request.query.user_id) {
            user_id = request.query.user_id;
        }
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Like.ADD_LIKE
        , [ user_id, post_id], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.sendStatus(201);
        });
    connection.end();
};