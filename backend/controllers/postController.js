const Post = require("../models/post.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getPostsByQuery = function (request, response){
    var author_id= request.query.author_id
    if(request.currentUser){
       author_id = request.currentUser.user_id;
    }
    const id = request.query.id;
    const text = request.query.text;
    const playlist_id = request.query.playlist_id;

    const connection = mysql.createConnection(mySqlConfig.config);

    if (id){
        logger.debug(Post.GET_ALL_POSTS+' WHERE id='+id);
        connection.query(Post.GET_ALL_POSTS+' WHERE id='+id, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }
    else {
        var sqlRequest = '';
        if (author_id) {
            sqlRequest += ' author_id=' + author_id;
            sqlRequest += ' AND';
        }
        if (playlist_id) {

            sqlRequest += ' playlist_id=' + playlist_id;
            sqlRequest += ' AND';
        }
        if (text) {
            sqlRequest += ' text LIKE \'%'+text+'%\'';
        }
        if (sqlRequest.substr(sqlRequest.length-3, 3) == 'AND')
        {
            sqlRequest = sqlRequest.slice(0, -3);
        }
        if (sqlRequest != ''){
            sqlRequest = ' WHERE' + sqlRequest;
        }
        logger.debug(Post.GET_ALL_POSTS+sqlRequest);
        connection.query(Post.GET_ALL_POSTS+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }

};

exports.updatePost = function(request, response) {
    const author_id = request.currentUser.user_id;
    const id = request.body.id;
    const text = request.body.text;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Post.UPDATE_POST;
    var sqlParams = [text, id];
    if(!(request.currentUser.role_id < 2))
    {
        sqlParams = sqlParams.concat([author_id]);
        sqlRequest +=' AND author_id=?';
        logger.debug(sqlRequest);
        logger.debug(sqlParams);
    }

    connection.query(sqlRequest, sqlParams, function(err, data) {
            if(err) {
                return response.status(400).send({ message: err.message});
            };
            logger.debug( data);
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "Access denied to post with id=" +id});
            }
            return response.sendStatus(200);
        });
connection.end();
};

exports.deletePost = function(request, response){
    const author_id = request.currentUser.user_id;
    const post_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Post.DELETE_POST_BY_ID;
    var sqlParams = [post_id];
    if(!(request.currentUser.role_id < 2))
    {
        sqlParams = sqlParams.concat([author_id]);
        sqlRequest +=' AND author_id=?';
        logger.debug(sqlRequest);
        logger.debug(sqlParams);
    }

    connection.query(sqlRequest, sqlParams, function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: " post not found"});
        }
        logger.debug(data);
        return response.sendStatus(200);
    });
    connection.end();
};


exports.addPost= function(request, response){
    const text = request.body.text;
    const playlist_id= request.body.playlist_id;
    var author_id = request.currentUser.user_id;
    if((request.currentUser.role_id < 2))
    {
        if(request.query.author_id) {
            author_id = request.query.author_id;
        }
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Post.ADD_POST
        , [text, author_id, playlist_id], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
    connection.end();
};