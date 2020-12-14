const Person = require("../models/person.js");
const Persons_roles = require("../models/persons_roles.js");
const Persons_languages = require("../models/persons_languages.js");
const logger = require('../configs/logger4jsInit');
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");



exports.getPersonsByQuery = function (request, response){
    var id= request.query.person_id;

    const nickname = request.query.nickname;
    const name = request.query.name;
    const surname = request.query.surname;
    const countrie_id = request.query.countrie_id;
    const connection = mysql.createConnection(mySqlConfig.config);

    if (id){
        logger.debug(Person.GET_ALL_PERSONS+' WHERE id='+id);
        connection.query(Person.GET_ALL_PERSONS+' WHERE id='+id, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
        connection.end();
    }
    else {
        var sqlRequest = '';
        if (countrie_id) {
            sqlRequest += ' countrie_id = '+countrie_id+'';
            sqlRequest += ' AND';
        }
        if (nickname) {
            sqlRequest += ' nickname LIKE \'%'+nickname+'%\'';
            sqlRequest += ' AND';
        }
        if (name) {

            sqlRequest += ' name LIKE \'%'+name+'%\'';
            sqlRequest += ' AND';
        }
        if (surname) {
            sqlRequest += ' surname LIKE \'%'+surname+'%\'';
        }
        if (sqlRequest.substr(sqlRequest.length-3, 3) == 'AND')
        {
            sqlRequest = sqlRequest.slice(0, -3);
        }
        if (sqlRequest != ''){
            sqlRequest = ' WHERE' + sqlRequest;
        }
        logger.debug(Person.GET_ALL_PERSONS+sqlRequest);
        connection.query(Person.GET_ALL_PERSONS+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
        connection.end();
    }

};

exports.getPersonRoles = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Persons_roles.GET_ROLES_ID_BY_PERSONS_ID );
    connection.query(Persons_roles.GET_ROLES_ID_BY_PERSONS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getPersonLanguages = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Persons_languages.GET_LANGUAGES_ID_BY_PERSONS_ID );
    connection.query(Persons_languages.GET_LANGUAGES_ID_BY_PERSONS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.updatePerson = function(request, response) {
    if(!request.body) return response.status(400).send(
        { message: "null request body"});
    //if(!request.body.password) return response.status(400).send(
    //    { message: "password must be not null"});

    const id = request.body.id;
    const name = request.body.name;
    const surname= request.body.surname;
    const nickname = request.body.nickname;
    const birth_date = request.body.birth_date;
    const die_date = request.body.die_date;
    const biography= request.body.biography;
    var countrie_id= request.body.countrie_id;
    if(!countrie_id){
        countrie_id=1;
    }
    if (!request.body.person_roles) {
        return response.status(400).send({message: "field person_roles must be not null"});
    }
    if (!request.body.languages) {
        return response.status(400).send({message: "field languages must be not null"});
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(Person.UPDATE_PERSON,
        [name, surname, nickname, birth_date, die_date, biography, countrie_id,  id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({ message: err.message});
            };
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "person not found"});
            }

            var sqlParams = [];
            request.body.person_roles.forEach(role_id => sqlParams = sqlParams.concat([[id, role_id]]));
            connection.query( Persons_roles.DELETE_PERSONS_ROLES_BY_PERSON_ID, id, function(err, data) {
                if(err) {
                    connection.end();
                    return response.status(400).send({message: "delete error"+err.message});
                };
                connection.query( Persons_roles.ADD_PERSONS_ROLES, [sqlParams], function(err, data) {
                    if(err) {
                        connection.end();
                        return response.status(400).send({message: err.message});
                    };

                    //logger.debug(    data);
                    var sqlParams = [];
                    request.body.languages.forEach(language_id => sqlParams = sqlParams.concat([[id, language_id]]));
                    connection.query( Persons_languages.DELETE_PERSONS_LANGUAGES_BY_PERSON_ID, id, function(err, data) {
                        if(err) {
                            connection.end();
                            return response.status(400).send({message: "delete error"+err.message});
                        };
                        connection.query( Persons_languages.ADD_PERSONS_LANGUAGES, [sqlParams], function(err, data) {
                            if(err) {
                                return response.status(400).send({message: err.message});
                            };
                            //logger.debug(    data);
                            return response.sendStatus(200);
                        });
                        connection.end();
                    });
                });

            });
        });
    //connection.end();
    //response.status(200).send('true');
};

exports.deletePerson = function(request, response){
    const person_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(Person.DELETE_PERSON_BY_ID, [person_id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "person not found"});
        }
        return response.sendStatus(200);
    });
    connection.end();
};



exports.addPerson= function(request, response){

    if(!request.body) return response.sendStatus(400);
    const name = request.body.name;
    const surname= request.body.surname;
    const nickname = request.body.nickname;
    const birth_date = request.body.birth_date;
    const die_date = request.body.die_date;
    const biography= request.body.biography;
    var countrie_id= request.body.countrie_id;
    if(!countrie_id){
        countrie_id=1;
    }
    if (!request.body.person_roles) {
        return response.status(400).send({message: "field person_roles must be not null"});
    }
    if (!request.body.languages) {
        return response.status(400).send({message: "field languages must be not null"});
    }
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Person.ADD_PERSON,
        [name, surname, nickname, birth_date, die_date, biography, countrie_id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({message: err.message});
            };

            var sqlParams = [];
            const person_id = data.insertId;
            request.body.person_roles.forEach(role_id => sqlParams = sqlParams.concat([[person_id, role_id]]));
            connection.query( Persons_roles.ADD_PERSONS_ROLES, [sqlParams], function(err, data) {
                if(err) {
                    connection.end();
                    return response.status(400).send({message: err.message});
                };

                //logger.debug(    data);
                var sqlParams = [];
                request.body.languages.forEach(language_id => sqlParams = sqlParams.concat([[person_id, language_id]]));
                connection.query( Persons_languages.ADD_PERSONS_LANGUAGES, [sqlParams], function(err, data) {
                    if(err) {
                        return response.status(400).send({message: err.message});
                    };
                    //logger.debug(    data);
                    return response.status(201).send({insert_id:  person_id });
                });
                connection.end();

            });


        });
    //connection.end();

};