const Countrie = require("../models/countrie.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getCountriesByQuery = function (request, response){

    const id = request.query.id;
    const title = request.query.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    if (id){
        logger.debug(Countrie.GET_ALL_COUNTRIES+' WHERE id='+id);
        connection.query(Countrie.GET_ALL_COUNTRIES+' WHERE id='+id, function (err, data) {
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
        logger.debug(Countrie.GET_ALL_COUNTRIES+sqlRequest);
        connection.query(Countrie.GET_ALL_COUNTRIES+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }
    connection.end();
};

exports.updateCountrie = function(request, response) {
    const id = request.body.id;
    const title = request.body.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Countrie.UPDATE_COUNTRIE;
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

exports.deleteCountrie = function(request, response){
    const countrie_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Countrie.DELETE_COUNTRIE_BY_ID;
    var sqlParams = [countrie_id];

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


exports.addCountrie= function(request, response){
    const title = request.body.title;
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Countrie.ADD_COUNTRIE, [title], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
    connection.end();
};