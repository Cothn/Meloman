const Comment = require("../models/comment.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getCommentsByQuery = function (request, response){
    var author_id= request.query.author_id
    if(request.currentUser){
       author_id = request.currentUser.user_id;
    }
    const id = request.query.id;
    const text = request.query.text;
    const post_id = request.query.post_id;

    const connection = mysql.createConnection(mySqlConfig.config);

    if (id){
        logger.debug(Comment.GET_ALL_COMMENTS+' WHERE id='+id);
        connection.query(Comment.GET_ALL_COMMENTS+' WHERE id='+id, function (err, data) {
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
        if (post_id) {

            sqlRequest += ' post_id=' + post_id;
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
        logger.debug(Comment.GET_ALL_COMMENTS+sqlRequest);
        connection.query(Comment.GET_ALL_COMMENTS+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }
    connection.end();
};

exports.updateComment = function(request, response) {
    const author_id = request.currentUser.user_id;
    const id = request.body.id;
    const text = request.body.text;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Comment.UPDATE_COMMENT;
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
                return response.status(400).send({ message: "Access denied to comment with id=" +id});
            }
            return response.sendStatus(200);
        });
connection.end();
};

exports.deleteComment = function(request, response){
    const author_id = request.currentUser.user_id;
    const comment_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Comment.DELETE_COMMENT_BY_ID;
    var sqlParams = [comment_id];
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
            return response.status(400).send({ message: " comment not found"});
        }
        logger.debug(data);
        return response.sendStatus(200);
    });
    connection.end();
};


exports.addComment= function(request, response){
    const text = request.body.text;
    const post_id= request.body.post_id;
    var author_id = request.currentUser.user_id;
    if((request.currentUser.role_id < 2))
    {
        if(request.query.author_id) {
            author_id = request.query.author_id;
        }
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Comment.ADD_COMMENT
        , [text, author_id, post_id], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
    connection.end();
};