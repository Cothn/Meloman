const User_playlist = require("../models/user_playlist.js");
const PlayList = require("../models/playlist");
const logger = require('../configs/logger4jsInit');
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getPlayListsByUser = function (request, response){
    var user_id= request.query.user_id;
    if(request.currentUser){
        user_id = request.currentUser.user_id;
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    logger.debug(User_playlist.GET_PLAYLISTS_ID_BY_USER_ID);
    connection.query(User_playlist.GET_PLAYLISTS_ID_BY_USER_ID, user_id, function (err, data) {
        if(err) {
            connection.end();
            return response.status(400).send({message: err.message});
        };
        if(data.length == 0)
        {
            return response.status(200).send({message: "user playlists not found"});

        }

        var sqlParams = [];
        data.forEach(el => sqlParams = sqlParams.concat([el.playlist_id]));
        logger.debug(sqlParams);
        connection.query( PlayList.GET_ALL_PLAYLISTS+' WHERE id IN (?)', [sqlParams], function(err, data) {
            if(err) {

                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
        connection.end();
    });


};

exports.deletePlayList = function(request, response){
    var user_id = request.currentUser.user_id;
    const playlist_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    if(request.currentUser.role_id < 2)
    {
        if(request.query.user_id) {
            user_id = request.query.user_id;
        }
    }

    connection.query( User_playlist.DELETE_USER_PLAYLIST_BY_PK, [user_id, playlist_id], function(err, data) {
        if(err) {
            connection.end();
            return response.status(400).send({message: "delete error"+err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({message: "playlists not found at user favourite"});
        }
        logger.debug(data);
        return response.sendStatus(200);

    });
    connection.end();

};

exports.addPlayList= function(request, response){
    const playlist_id = request.body.playlist_id;
    var user_id = request.currentUser.user_id;
    if((request.currentUser.role_id < 2))
    {
        if(request.query.user_id) {
            user_id = request.query.user_id;
        }
    }

    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( User_playlist.ADD_USER_PLAYLIST, [user_id,  playlist_id], function(err, data) {
            if(err) {

                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);

            return response.sendStatus(201);

    });
    connection.end();
};