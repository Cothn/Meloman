const Language = require("../models/language.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getLanguagesByQuery = function (request, response){

    const id = request.query.id;
    const title = request.query.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    if (id){
        logger.debug(Language.GET_ALL_LANGUAGES+' WHERE id='+id);
        connection.query(Language.GET_ALL_LANGUAGES+' WHERE id='+id, function (err, data) {
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
        logger.debug(Language.GET_ALL_LANGUAGES+sqlRequest);
        connection.query(Language.GET_ALL_LANGUAGES+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }
    connection.end();
};

exports.updateLanguage = function(request, response) {
    const id = request.body.id;
    const title = request.body.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Language.UPDATE_LANGUAGE;
    var sqlParams = [title, id];

    connection.query(sqlRequest, sqlParams, function(err, data) {
            if(err) {
                return response.status(400).send({ message: err.message});
            };
            logger.debug( data);
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "Error to update country with id=" +id});
            }
            return response.sendStatus(200);
        });
    connection.end();
};

exports.deleteLanguage = function(request, response){
    const languages_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Language.DELETE_LANGUAGE_BY_ID;
    var sqlParams = [languages_id];

    connection.query(sqlRequest, sqlParams, function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "country not found"});
        }
        logger.debug(data);
        return response.sendStatus(200);
    });
    connection.end();
};


exports.addLanguage= function(request, response){
    const title = request.body.title;
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Language.ADD_LANGUAGE, [title], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
    connection.end();
};