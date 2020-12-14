const Person_role = require("../models/person_roles.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getPerson_rolesByQuery = function (request, response){

    const id = request.query.id;
    const title = request.query.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    if (id){
        logger.debug(Person_role.GET_ALL_PERSON_ROLES+' WHERE id='+id);
        connection.query(Person_role.GET_ALL_PERSON_ROLES+' WHERE id='+id, function (err, data) {
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
        logger.debug(Person_role.GET_ALL_PERSON_ROLES+sqlRequest);
        connection.query(Person_role.GET_ALL_PERSON_ROLES+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }
    connection.end();
};

exports.updatePerson_role = function(request, response) {
    const id = request.body.id;
    const title = request.body.title;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Person_role.UPDATE_PERSON_ROLE;
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

exports.deletePerson_role = function(request, response){
    const person_roles_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Person_role.DELETE_PERSON_ROLE_BY_ID;
    var sqlParams = [person_roles_id];

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


exports.addPerson_role= function(request, response){
    const title = request.body.title;
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Person_role.ADD_PERSON_ROLE, [title], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
    connection.end();
};