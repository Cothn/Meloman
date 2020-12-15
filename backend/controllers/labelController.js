const Label = require("../models/label.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getLabelsByQuery = function (request, response){

    const id = request.query.id;
    const title = request.query.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    if (id){
        logger.debug(Label.GET_ALL_LABELS+' WHERE id='+id);
        connection.query(Label.GET_ALL_LABELS+' WHERE id='+id, function (err, data) {
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
        logger.debug(Label.GET_ALL_LABELS+sqlRequest);
        connection.query(Label.GET_ALL_LABELS+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }
    connection.end();
};

exports.updateLabel = function(request, response) {
    const id = request.body.id;
    const title = request.body.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Label.UPDATE_LABEL;
    var sqlParams = [title, id];

    connection.query(sqlRequest, sqlParams, function(err, data) {
            if(err) {
                return response.status(400).send({ message: err.message});
            };
            logger.debug( data);
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "Error to update label with id=" +id});
            }
            return response.sendStatus(200);
        });
    connection.end();
};

exports.deleteLabel = function(request, response){
    const label_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Label.DELETE_LABEL_BY_ID;
    var sqlParams = [label_id];

    connection.query(sqlRequest, sqlParams, function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "label not found"});
        }
        logger.debug(data);
        return response.sendStatus(200);
    });
    connection.end();
};


exports.addLabel= function(request, response){
    const title = request.body.title;
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Label.ADD_LABEL, [title], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
    connection.end();
};