const Genre = require("../models/genre.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getGenresByQuery = function (request, response){

    const id = request.query.id;
    const title = request.query.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    if (id){
        logger.debug(Genre.GET_ALL_GENRES+' WHERE id='+id);
        connection.query(Genre.GET_ALL_GENRES+' WHERE id='+id, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }
    else {
        var sqlRequest = '';
        if (title) {
            sqlRequest += ' title LIKE \'%'+title+'%\'';
        }
        if (sqlRequest != ''){
            sqlRequest = ' WHERE' + sqlRequest;
        }
        logger.debug(Genre.GET_ALL_GENRES+sqlRequest);
        connection.query(Genre.GET_ALL_GENRES+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }

};

exports.updateGenre = function(request, response) {
    const id = request.body.id;
    const title = request.body.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Genre.UPDATE_GENRE;
    var sqlParams = [title, id];

    connection.query(sqlRequest, sqlParams, function(err, data) {
            if(err) {
                return response.status(400).send({ message: err.message});
            };
            logger.debug( data);
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "Error to update genre with id=" +id});
            }
            return response.sendStatus(200);
        });
    connection.end();
};

exports.deleteGenre = function(request, response){
    const genre_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Genre.DELETE_GENRE_BY_ID;
    var sqlParams = [genre_id];

    connection.query(sqlRequest, sqlParams, function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "genre not found"});
        }
        logger.debug(data);
        return response.sendStatus(200);
    });
    connection.end();
};


exports.addGenre= function(request, response){
    const title = request.body.title;
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Genre.ADD_GENRE, [title], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
    connection.end();
};