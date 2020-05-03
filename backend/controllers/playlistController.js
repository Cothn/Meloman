const PlayList_Track = require("../models/playlist_track.js");
const PlayList = require("../models/playlist.js");
const logger = require('../configs/logger4jsInit');
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getPlayListsByQuery = function (request, response){
    var author_id= request.query.author_id;
    if(request.currentUser){
       author_id = request.currentUser.user_id;
    }
    const id = request.query.id;
    const title = request.query.title;

    const connection = mysql.createConnection(mySqlConfig.config);

    if (id){
        logger.debug(PlayList.GET_ALL_PLAYLISTS+' WHERE id='+id);
        connection.query(PlayList.GET_ALL_PLAYLISTS+' WHERE id='+id, function (err, data) {
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
        if (title) {
            sqlRequest += ' title LIKE \'%'+title+'%\'';
        }
        if (sqlRequest.substr(sqlRequest.length-3, 3) == 'AND')
        {
            sqlRequest.length -= 3;
        }
        if (sqlRequest != ''){
            sqlRequest = ' WHERE' + sqlRequest;
        }
        logger.debug(PlayList.GET_ALL_PLAYLISTS+sqlRequest);
        connection.query(PlayList.GET_ALL_PLAYLISTS+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }

};

exports.getPlayListsTracks = function (request, response){
    var id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);

        logger.debug(PlayList_Track.GET_TRACKS_ID_BY_PLAYLIST_ID);
        connection.query(PlayList_Track.GET_TRACKS_ID_BY_PLAYLIST_ID, [id], function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });

};



exports.updatePlayList = function(request, response) {
    const  id = request.body.id;
    const title = request.body.title;
    const author_id = request.currentUser.user_id;
    if (!request.body.tracks) {
        return response.status(400).send({message: "field tracks must be not null"});
    }

    var sqlRequest = PlayList.UPDATE_PLAYLIST;
    var sqlParams = [title, id];
    if(!(request.currentUser.role_id < 2))
    {
        sqlParams = sqlParams.concat([author_id]);
        sqlRequest +=' AND author_id=?';
        logger.debug(sqlRequest);
        logger.debug(sqlParams);
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( sqlRequest, sqlParams, function(err, data) {
        if(err) {
            connection.end();
            return response.status(400).send({message: err.message});
        };
        logger.debug( data);
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: "Access denied to playlist with id=" +id});
        }

        var sqlParams = [];
        request.body.tracks.forEach(track_id => sqlParams = sqlParams.concat([[id, track_id]]));
        connection.query( PlayList_Track.DELETE_PLAYLIST_TRACKS_BY_PLAYLIST_ID, id, function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({message: "delete error"+err.message});
            };
            connection.query( PlayList_Track.ADD_PLAYLIST_TRACK, [sqlParams], function(err, data) {
                if(err) {

                    return response.status(400).send({message: err.message});
                };
                //logger.debug(    data);
                return response.sendStatus(200);
            });
            connection.end();
        });
    });

};

exports.deletePlayList = function(request, response){
    const author_id = request.currentUser.user_id;
    const playlist_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = PlayList.DELETE_PLAYLIST_BY_ID;
    var sqlParams = [playlist_id];
    if(!(request.currentUser.role_id < 2))
    {
        sqlParams = sqlParams.concat([author_id]);
        sqlRequest +=' AND author_id=?';
        logger.debug(sqlRequest);
        logger.debug(sqlParams);
    }

    connection.query( PlayList_Track.DELETE_PLAYLIST_TRACKS_BY_PLAYLIST_ID, playlist_id, function(err, data) {
        if(err) {
            connection.end();
            return response.status(400).send({message: "delete error"+err.message});
        };
        connection.query(sqlRequest, sqlParams, function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: " playlist not found"});
            }
            logger.debug(data);
            return response.sendStatus(200);
        });
        connection.end();
    });

};


exports.addPlayList= function(request, response){
    const title = request.body.title;
    const author_id = request.currentUser.user_id;
    if (!request.body.tracks) {
        return response.status(400).send({message: "field tracks must be not null"});
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( PlayList.ADD_PLAYLIST, [title, author_id], function(err, data) {
            if(err) {
                connection.end();
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);

            var sqlParams = [];
            const playlist_id = data.insertId;
            request.body.tracks.forEach(track_id => sqlParams = sqlParams.concat([[playlist_id, track_id]]));
            connection.query( PlayList_Track.ADD_PLAYLIST_TRACK, [sqlParams], function(err, data) {
                if(err) {

                    return response.status(400).send({message: err.message});
                };
                //logger.debug(    data);
                return response.status(201).send({insert_id:  playlist_id});
            });
            connection.end();
        });

};

exports.addTrack= function(request, response){
    const author_id = request.currentUser.user_id;
    const id = request.params.id;
    if (!request.body.tracks) {
        return response.status(400).send({message: "field tracks must be not null"});
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = PlayList.GET_ALL_PLAYLISTS+' WHERE id='+id;
    if(!(request.currentUser.role_id < 2))
    {
        sqlRequest +=' AND author_id='+author_id;

    }
    logger.debug(sqlRequest);
    connection.query(sqlRequest, function (err, data) {
        if(err) {
            connection.end();
            return response.status(400).send({message: err.message});
        };

        var sqlParams = [];
        const playlist_id = data[0].id;
        request.body.tracks.forEach(track_id => sqlParams = sqlParams.concat([[playlist_id, track_id]]));
        logger.debug(data.id);
        connection.query( PlayList_Track.ADD_PLAYLIST_TRACK, [sqlParams], function(err, data) {
            if(err) {

                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.sendStatus(201);
        });
        connection.end();
    });

};