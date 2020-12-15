const Single = require("../models/single.js");
const Singles_persons = require("../models/singles_persons.js");
const logger = require('../configs/logger4jsInit');
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getSinglesByQuery = function (request, response){
    var id= request.query.single_id;

    const title = request.query.title;
    const release_date = request.query.release_date;
    const label_id = request.query.label_id;
    var language_id= request.body.language_id;
    var groups_id= request.body.groups_id;
    const connection = mysql.createConnection(mySqlConfig.config);

    if (id){
        logger.debug(Single.GET_ALL_SINGLES+' WHERE id='+id);
        connection.query(Single.GET_ALL_SINGLES+' WHERE id='+id, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
        connection.end();
    }
    else {
        var sqlRequest = '';
        if (label_id) {
            sqlRequest += ' label_id = '+label_id+'';
            sqlRequest += ' AND';
        }
        if (language_id) {
            sqlRequest += ' language_id = '+language_id+'';
            sqlRequest += ' AND';
        }
        if (groups_id) {
            sqlRequest += ' groups_id = '+groups_id+'';
            sqlRequest += ' AND';
        }
        if (title) {
            sqlRequest += ' title LIKE \'%'+title+'%\'';
            sqlRequest += ' AND';
        }
        if (release_date) {

            sqlRequest += ' release_date LIKE \'%'+release_date+'%\'';
            sqlRequest += ' AND';
        }
        if (sqlRequest.substr(sqlRequest.length-3, 3) == 'AND')
        {
            sqlRequest = sqlRequest.slice(0, -3);
        }
        if (sqlRequest != ''){
            sqlRequest = ' WHERE' + sqlRequest;
        }
        logger.debug(Single.GET_ALL_SINGLES+sqlRequest);
        connection.query(Single.GET_ALL_SINGLES+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
        connection.end();
    }

};

exports.getSinglePersons = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Singles_persons.GET_PERSONS_ID_BY_SINGLES_ID );
    connection.query(Singles_persons.GET_PERSONS_ID_BY_SINGLES_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};


exports.updateSingle = function(request, response) {
    if(!request.body) return response.status(400).send(
        { message: "null request body"});
    //if(!request.body.password) return response.status(400).send(
    //    { message: "password must be not null"});

    const id = request.body.id;
    const title = request.body.title;
    const description= request.body.description;
    var groups_id= request.body.groups_id;
    if (!request.body.single_persons) {
        return response.status(400).send({message: "field single_persons must be not null"});
    }


    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(Single.UPDATE_SINGLE,
        [title,  description,  id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({ message: err.message});
            };
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "single not found"});
            }

            var sqlParams = [];
            request.body.single_persons.forEach(person_id => sqlParams = sqlParams.concat([[id, person_id]]));
            connection.query( Singles_persons.DELETE_SINGLES_PERSONS_BY_SINGLE_ID, id, function(err, data) {
                if(err) {
                    connection.end();
                    return response.status(400).send({message: "delete error"+err.message});
                };
                connection.query( Singles_persons.ADD_SINGLES_PERSONS, [sqlParams], function(err, data) {
                    if(err) {

                        return response.status(400).send({message: err.message});
                    };

                    return response.sendStatus(200);
                });
                connection.end();
            });
        });
    //connection.end();
    //response.status(200).send('true');
};

exports.deleteSingle = function(request, response){
    const single_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(Single.DELETE_SINGLE_BY_ID, [single_id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "single not found"});
        }
        return response.sendStatus(200);
    });
    connection.end();
};



exports.addSingle= function(request, response){

    if(!request.body) return response.sendStatus(400);
    const title = request.body.title;
    const release_date = request.body.release_date;
    const description= request.body.description;
    var track_id= request.body.track_id;
    var language_id= request.body.language_id;
    var groups_id= request.body.groups_id;
    var label_id= request.body.label_id;
    if(!label_id){
        return response.status(400).send({message: "field label must be not null"});
    }
    if(!request.body.track_id){
        return response.status(400).send({message: "field track must be not null"});
    }
    if (!request.body.single_persons) {
        return response.status(400).send({message: "field single_persons must be not null"});
    }
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Single.ADD_SINGLE,
        [title, release_date, description, label_id, track_id, language_id, groups_id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({message: err.message});
            };

            var sqlParams = [];
            const single_id = data.insertId;
            request.body.single_persons.forEach(person_id => sqlParams = sqlParams.concat([[single_id, person_id]]));
            connection.query( Singles_persons.ADD_SINGLES_PERSONS, [sqlParams], function(err, data) {
                if(err) {

                    return response.status(400).send({message: err.message});
                };

                //logger.debug(    data);
                return response.status(201).send({insert_id:  single_id });
            });
            connection.end();
        });
    //connection.end();

};