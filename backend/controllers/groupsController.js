const Group = require("../models/group.js");
const Groups_persons = require("../models/groups_persons.js");
const Groups_languages = require("../models/groups_languages.js");
const Groups_genres = require("../models/groups_genres.js");
const Groups_labels = require("../models/groups_labels.js");
const Groups_albums = require("../models/albums_groups.js");
const Groups_singles = require("../models/single.js");
const logger = require('../configs/logger4jsInit');
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");



exports.getGroupsByQuery = function (request, response){
    var id= request.query.group_id;

    const title = request.query.title;
    const birth_date = request.query.birth_date;
    const die_date = request.query.die_date;
    const connection = mysql.createConnection(mySqlConfig.config);

    if (id){
        logger.debug(Group.GET_ALL_GROUPS+' WHERE id='+id);
        connection.query(Group.GET_ALL_GROUPS+' WHERE id='+id, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
        connection.end();
    }
    else {
        var sqlRequest = '';
        if (title) {
            sqlRequest += ' title LIKE \'%'+title+'%\'';
            sqlRequest += ' AND';
        }
        if (birth_date) {

            sqlRequest += ' birth_date LIKE \'%'+birth_date+'%\'';
            sqlRequest += ' AND';
        }
        if (die_date) {
            sqlRequest += ' die_date LIKE \'%'+die_date+'%\'';
        }
        if (sqlRequest.substr(sqlRequest.length-3, 3) == 'AND')
        {
            sqlRequest = sqlRequest.slice(0, -3);
        }
        if (sqlRequest != ''){
            sqlRequest = ' WHERE' + sqlRequest;
        }
        logger.debug(Group.GET_ALL_GROUPS+sqlRequest);
        connection.query(Group.GET_ALL_GROUPS+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
        connection.end();
    }

};
exports.getGroupAlbums = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Groups_albums.GET_ALBUMS_ID_BY_GROUPS_ID );
    connection.query(Groups_albums.GET_ALBUMS_ID_BY_GROUPS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};
exports.getGroupSingles = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Groups_singles.GET_SINGLES_ID_BY_GROUP_ID );
    connection.query(Groups_singles.GET_SINGLES_ID_BY_GROUP_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getGroupPersons = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Groups_persons.GET_PERSONS_ID_BY_GROUPS_ID );
    connection.query(Groups_persons.GET_PERSONS_ID_BY_GROUPS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getGroupLanguages = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Groups_languages.GET_LANGUAGES_ID_BY_GROUPS_ID );
    connection.query(Groups_languages.GET_LANGUAGES_ID_BY_GROUPS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getGroupLabels = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Groups_labels.GET_LABELS_ID_BY_GROUPS_ID );
    connection.query(Groups_labels.GET_LABELS_ID_BY_GROUPS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getGroupGenres = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Groups_genres.GET_GENRES_ID_BY_GROUPS_ID );
    connection.query(Groups_genres.GET_GENRES_ID_BY_GROUPS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};


exports.updateGroup = function(request, response) {
    if(!request.body) return response.status(400).send(
        { message: "null request body"});
    //if(!request.body.password) return response.status(400).send(
    //    { message: "password must be not null"});

    const id = request.body.id;
    const title = request.body.title;
    const birth_date = request.body.birth_date;
    const die_date = request.body.die_date;
    const description= request.body.description;
    var countrie_id= request.body.countrie_id;
    if(!countrie_id){
        countrie_id=1;
    }
    if (!request.body.group_persons) {
        return response.status(400).send({message: "field group_persons must be not null"});
    }
    if (!request.body.languages) {
        return response.status(400).send({message: "field languages must be not null"});
    }
    if (!request.body.genres) {
        return response.status(400).send({message: "field genres must be not null"});
    }
    if (!request.body.labels) {
        return response.status(400).send({message: "field labels must be not null"});
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(Group.UPDATE_GROUP,
        [title,  birth_date, die_date, description, countrie_id,  id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({ message: err.message});
            };
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "group not found"});
            }

            var sqlParams = [];
            request.body.group_persons.forEach(person_id => sqlParams = sqlParams.concat([[id, person_id]]));
            connection.query( Groups_persons.DELETE_GROUPS_PERSONS_BY_GROUP_ID, id, function(err, data) {
                if(err) {
                    connection.end();
                    return response.status(400).send({message: "delete error"+err.message});
                };
                connection.query( Groups_persons.ADD_GROUPS_PERSONS, [sqlParams], function(err, data) {
                    if(err) {
                        connection.end();
                        return response.status(400).send({message: err.message});
                    };

                    //logger.debug(    data);
                    var sqlParams = [];
                    request.body.languages.forEach(language_id => sqlParams = sqlParams.concat([[id, language_id]]));
                    connection.query( Groups_languages.DELETE_GROUPS_LANGUAGES_BY_GROUP_ID, id, function(err, data) {
                        if(err) {
                            connection.end();
                            return response.status(400).send({message: "delete error"+err.message});
                        };
                        connection.query( Groups_languages.ADD_GROUPS_LANGUAGES, [sqlParams], function(err, data) {
                            if(err) {
                                connection.end();
                                return response.status(400).send({message: err.message});
                            };

                            var sqlParams = [];
                            request.body.genres.forEach(genre_id => sqlParams = sqlParams.concat([[id, genre_id]]));
                            connection.query( Groups_genres.DELETE_GROUPS_GENRES_BY_GROUP_ID, id, function(err, data) {
                                if(err) {
                                    connection.end();
                                    return response.status(400).send({message: "delete error"+err.message});
                                };
                                connection.query( Groups_genres.ADD_GROUPS_GENRES, [sqlParams], function(err, data) {
                                    if(err) {
                                        connection.end();
                                        return response.status(400).send({message: err.message});
                                    };
                                    //logger.debug(    data);
                                    var sqlParams = [];
                                    request.body.labels.forEach(label_id => sqlParams = sqlParams.concat([[id, label_id]]));
                                    connection.query( Groups_labels.DELETE_GROUPS_LABELS_BY_GROUP_ID, id, function(err, data) {
                                        if(err) {
                                            connection.end();
                                            return response.status(400).send({message: "delete error"+err.message});
                                        };
                                        connection.query( Groups_labels.ADD_GROUPS_LABELS, [sqlParams], function(err, data) {
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

                    });
                });

            });
        });
    //connection.end();
    //response.status(200).send('true');
};

exports.deleteGroup = function(request, response){
    const group_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(Group.DELETE_GROUP_BY_ID, [group_id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "group not found"});
        }
        return response.sendStatus(200);
    });
    connection.end();
};



exports.addGroup= function(request, response){

    if(!request.body) return response.sendStatus(400);
    const title = request.body.title;
    const birth_date = request.body.birth_date;
    const die_date = request.body.die_date;
    const description= request.body.description;
    var countrie_id= request.body.countrie_id;
    if(!countrie_id){
        countrie_id=1;
    }
    if (!request.body.group_persons) {
        return response.status(400).send({message: "field group_persons must be not null"});
    }
    if (!request.body.languages) {
        return response.status(400).send({message: "field languages must be not null"});
    }
    if (!request.body.genres) {
        return response.status(400).send({message: "field genres must be not null"});
    }
    if (!request.body.labels) {
        return response.status(400).send({message: "field labels must be not null"});
    }
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Group.ADD_GROUP,
        [title, birth_date, die_date, description, countrie_id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({message: err.message});
            };

            var sqlParams = [];
            const group_id = data.insertId;
            request.body.group_persons.forEach(person_id => sqlParams = sqlParams.concat([[group_id, person_id]]));
            connection.query( Groups_persons.ADD_GROUPS_PERSONS, [sqlParams], function(err, data) {
                if(err) {
                    connection.end();
                    return response.status(400).send({message: err.message});
                };

                //logger.debug(    data);
                var sqlParams = [];
                request.body.languages.forEach(language_id => sqlParams = sqlParams.concat([[group_id, language_id]]));
                connection.query( Groups_languages.ADD_GROUPS_LANGUAGES, [sqlParams], function(err, data) {
                    if(err) {
                        connection.end();
                        return response.status(400).send({message: err.message});
                    };
                    //logger.debug(    data);
                    //logger.debug(    data);
                    var sqlParams = [];
                    request.body.labels.forEach(label_id => sqlParams = sqlParams.concat([[group_id, label_id]]));
                    connection.query( Groups_labels.ADD_GROUPS_LABELS, [sqlParams], function(err, data) {
                        if(err) {
                            connection.end();
                            return response.status(400).send({message: err.message});
                        };
                        //logger.debug(    data);
                        //logger.debug(    data);
                        var sqlParams = [];
                        request.body.genres.forEach(genre_id => sqlParams = sqlParams.concat([[group_id, genre_id]]));
                        connection.query( Groups_genres.ADD_GROUPS_GENRES, [sqlParams], function(err, data) {
                            if(err) {
                                return response.status(400).send({message: err.message});
                            };
                            //logger.debug(    data);
                            return response.status(201).send({insert_id:  group_id });
                        });
                        connection.end();
                    });

                });


            });


        });
    //connection.end();

};