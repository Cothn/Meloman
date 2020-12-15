const Album = require("../models/album.js");
const Albums_persons = require("../models/albums_persons.js");
const Albums_languages = require("../models/albums_languages.js");
const Albums_genres = require("../models/albums_genres.js");
const Albums_groups = require("../models/albums_groups.js");
const Albums_tracks = require("../models/albums_tracks.js");
const logger = require('../configs/logger4jsInit');
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");



exports.getAlbumsByQuery = function (request, response){
    var id= request.query.album_id;

    const title = request.query.title;
    const release_date = request.query.release_date;
    const label_id = request.query.label_id;
    const connection = mysql.createConnection(mySqlConfig.config);

    if (id){
        logger.debug(Album.GET_ALL_ALBUMS+' WHERE id='+id);
        connection.query(Album.GET_ALL_ALBUMS+' WHERE id='+id, function (err, data) {
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
        logger.debug(Album.GET_ALL_ALBUMS+sqlRequest);
        connection.query(Album.GET_ALL_ALBUMS+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
        connection.end();
    }

};

exports.getAlbumPersons = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Albums_persons.GET_PERSONS_ID_BY_ALBUMS_ID );
    connection.query(Albums_persons.GET_PERSONS_ID_BY_ALBUMS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getAlbumLanguages = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Albums_languages.GET_LANGUAGES_ID_BY_ALBUMS_ID );
    connection.query(Albums_languages.GET_LANGUAGES_ID_BY_ALBUMS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getAlbumGroups = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Albums_groups.GET_GROUPS_ID_BY_ALBUMS_ID );
    connection.query(Albums_groups.GET_GROUPS_ID_BY_ALBUMS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getAlbumTracks = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Albums_tracks.GET_TRACKS_ID_BY_ALBUMS_ID );
    connection.query(Albums_tracks.GET_TRACKS_ID_BY_ALBUMS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};

exports.getAlbumGenres = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

    logger.debug(Albums_genres.GET_GENRES_ID_BY_ALBUMS_ID );
    connection.query(Albums_genres.GET_GENRES_ID_BY_ALBUMS_ID , [id], function (err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        return response.status(200).send(data);
    });
    connection.end();
};


exports.updateAlbum = function(request, response) {
    if(!request.body) return response.status(400).send(
        { message: "null request body"});
    //if(!request.body.password) return response.status(400).send(
    //    { message: "password must be not null"});

    const id = request.body.id;
    const title = request.body.title;
    const description= request.body.description;
    if (!request.body.album_persons) {
        return response.status(400).send({message: "field album_persons must be not null"});
    }
    if (!request.body.languages) {
        return response.status(400).send({message: "field languages must be not null"});
    }
    if (!request.body.genres) {
        return response.status(400).send({message: "field genres must be not null"});
    }
    if (!request.body.groups) {
        return response.status(400).send({message: "field groups must be not null"});
    }
    if (!request.body.tracks) {
        return response.status(400).send({message: "field tracks must be not null"});
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(Album.UPDATE_ALBUM,
        [title,  description,  id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({ message: err.message});
            };
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "album not found"});
            }

            var sqlParams = [];
            request.body.album_persons.forEach(person_id => sqlParams = sqlParams.concat([[id, person_id]]));
            connection.query( Albums_persons.DELETE_ALBUMS_PERSONS_BY_ALBUM_ID, id, function(err, data) {
                if(err) {
                    connection.end();
                    return response.status(400).send({message: "delete error"+err.message});
                };
                connection.query( Albums_persons.ADD_ALBUMS_PERSONS, [sqlParams], function(err, data) {
                    if(err) {
                        connection.end();
                        return response.status(400).send({message: err.message});
                    };

                    //logger.debug(    data);
                    var sqlParams = [];
                    request.body.languages.forEach(language_id => sqlParams = sqlParams.concat([[id, language_id]]));
                    connection.query( Albums_languages.DELETE_ALBUMS_LANGUAGES_BY_ALBUM_ID, id, function(err, data) {
                        if(err) {
                            connection.end();
                            return response.status(400).send({message: "delete error"+err.message});
                        };
                        connection.query( Albums_languages.ADD_ALBUMS_LANGUAGES, [sqlParams], function(err, data) {
                            if(err) {
                                connection.end();
                                return response.status(400).send({message: err.message});
                            };

                            var sqlParams = [];
                            request.body.genres.forEach(genre_id => sqlParams = sqlParams.concat([[id, genre_id]]));
                            connection.query( Albums_genres.DELETE_ALBUMS_GENRES_BY_ALBUM_ID, id, function(err, data) {
                                if(err) {
                                    connection.end();
                                    return response.status(400).send({message: "delete error"+err.message});
                                };
                                connection.query( Albums_genres.ADD_ALBUMS_GENRES, [sqlParams], function(err, data) {
                                    if(err) {
                                        connection.end();
                                        return response.status(400).send({message: err.message});
                                    };
                                    //logger.debug(    data);
                                    var sqlParams = [];
                                    request.body.groups.forEach(group_id => sqlParams = sqlParams.concat([[id, group_id]]));
                                    connection.query( Albums_groups.DELETE_ALBUMS_GROUPS_BY_ALBUM_ID, id, function(err, data) {
                                        if(err) {
                                            connection.end();
                                            return response.status(400).send({message: "delete error"+err.message});
                                        };
                                        connection.query( Albums_groups.ADD_ALBUMS_GROUPS, [sqlParams], function(err, data) {
                                            if(err) {
                                                connection.end();
                                                return response.status(400).send({message: err.message});
                                            };
                                            //logger.debug(    data);
                                            var sqlParams = [];
                                            request.body.tracks.forEach(track_id => sqlParams = sqlParams.concat([[id, track_id]]));
                                            connection.query( Albums_tracks.DELETE_ALBUMS_TRACKS_BY_ALBUM_ID, id, function(err, data) {
                                                if(err) {
                                                    connection.end();
                                                    return response.status(400).send({message: "delete error"+err.message});
                                                };
                                                connection.query( Albums_tracks.ADD_ALBUMS_TRACKS, [sqlParams], function(err, data) {
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

            });
        });
    //connection.end();
    //response.status(200).send('true');
};

exports.deleteAlbum = function(request, response){
    const album_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query(Album.DELETE_ALBUM_BY_ID, [album_id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "album not found"});
        }
        return response.sendStatus(200);
    });
    connection.end();
};



exports.addAlbum= function(request, response){

    if(!request.body) return response.sendStatus(400);
    const title = request.body.title;
    const release_date = request.body.release_date;
    const description= request.body.description;
    var label_id= request.body.label_id;
    if(!label_id){
        label_id=1;
    }
    if (!request.body.album_persons) {
        return response.status(400).send({message: "field album_persons must be not null"});
    }
    if (!request.body.languages) {
        return response.status(400).send({message: "field languages must be not null"});
    }
    if (!request.body.genres) {
        return response.status(400).send({message: "field genres must be not null"});
    }
    if (!request.body.groups) {
        return response.status(400).send({message: "field groups must be not null"});
    }
    if (!request.body.tracks) {
        return response.status(400).send({message: "field tracks must be not null"});
    }
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Album.ADD_ALBUM,
        [title, release_date, description, label_id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({message: err.message});
            };

            var sqlParams = [];
            const album_id = data.insertId;
            request.body.album_persons.forEach(person_id => sqlParams = sqlParams.concat([[album_id, person_id]]));
            connection.query( Albums_persons.ADD_ALBUMS_PERSONS, [sqlParams], function(err, data) {
                if(err) {
                    connection.end();
                    return response.status(400).send({message: err.message});
                };

                //logger.debug(    data);
                var sqlParams = [];
                request.body.languages.forEach(language_id => sqlParams = sqlParams.concat([[album_id, language_id]]));
                connection.query( Albums_languages.ADD_ALBUMS_LANGUAGES, [sqlParams], function(err, data) {
                    if(err) {
                        connection.end();
                        return response.status(400).send({message: err.message});
                    };
                    //logger.debug(    data);
                    //logger.debug(    data);
                    var sqlParams = [];
                    request.body.groups.forEach(group_id => sqlParams = sqlParams.concat([[album_id, group_id]]));
                    connection.query( Albums_groups.ADD_ALBUMS_GROUPS, [sqlParams], function(err, data) {
                        if(err) {
                            connection.end();
                            return response.status(400).send({message: err.message});
                        };
                        //logger.debug(    data);
                        //logger.debug(    data);
                        var sqlParams = [];
                        request.body.genres.forEach(genre_id => sqlParams = sqlParams.concat([[album_id, genre_id]]));
                        connection.query( Albums_genres.ADD_ALBUMS_GENRES, [sqlParams], function(err, data) {
                            if(err) {
                                connection.end();
                                return response.status(400).send({message: err.message});
                            };
                            var sqlParams = [];
                            request.body.tracks.forEach(track_id => sqlParams = sqlParams.concat([[album_id, track_id]]));
                            connection.query( Albums_tracks.ADD_ALBUMS_TRACKS, [sqlParams], function(err, data) {
                                if(err) {
                                    return response.status(400).send({message: err.message});
                                };
                                //logger.debug(    data);
                                return response.status(201).send({insert_id:  album_id });
                            });
                            connection.end();
                        });
                    });

                });

            });

        });
    //connection.end();

};