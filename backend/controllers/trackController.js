const Track = require("../models/track.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");


exports.getTracksByQuery = function (request, response){
    var user_id= request.query.user_id
    if(request.currentUser){
       user_id = request.currentUser.user_id;
    }
    const id = request.query.id;
    const title = request.query.title;
    const genre_id = request.query.genre_id;

    const connection = mysql.createConnection(mySqlConfig.config);

    if (id){
        logger.debug(Track.GET_ALL_TRACKS+' WHERE id='+id);
        connection.query(Track.GET_ALL_TRACKS+' WHERE id='+id, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }
    else {
        var sqlRequest = '';
        if (user_id) {
            sqlRequest += ' user_id=' + user_id;
            sqlRequest += ' AND';
        }
        if (genre_id) {

            sqlRequest += ' genre_id=' + genre_id;
            sqlRequest += ' AND';
        }
        if (title) {
            sqlRequest += ' title LIKE \'%'+title+'%\'';
        }
        if (sqlRequest.substr(sqlRequest.length-3, 3) == 'AND')
        {
            sqlRequest = sqlRequest.slice(0, -3);
        }
        if (sqlRequest != ''){
            sqlRequest = ' WHERE' + sqlRequest;
        }
        logger.debug(Track.GET_ALL_TRACKS+sqlRequest);
        connection.query(Track.GET_ALL_TRACKS+sqlRequest, function (err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            return response.status(200).send(data);
        });
    }

};





exports.updateTrack = function(request, response) {
    const user_id = request.currentUser.user_id;
    const id = request.body.id;
    const title = request.body.title;
    const genre_id= request.body.genre_id;
    //logger.debug( "mess3");
    //logger.debug(  id);

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Track.UPDATE_TRACK;
    var sqlParams = [title, genre_id, id];
    if(!(request.currentUser.role_id < 2))
    {
        sqlParams = sqlParams.concat([user_id]);
        sqlRequest +=' AND user_id=?';
        logger.debug(sqlRequest);
        logger.debug(sqlParams);
    }

    connection.query(sqlRequest, sqlParams, function(err, data) {
            if(err) {
                return response.status(400).send({ message: err.message});
            };
            logger.debug( data);
            if(data.affectedRows == 0)
            {
                return response.status(400).send({ message: "Access denied to track with id=" +id});
            }
            return response.sendStatus(200);
        });
connection.end();
};

exports.deleteTrack = function(request, response){
    const user_id = request.currentUser.user_id;
    const track_id= request.params.id;

    const connection = mysql.createConnection(mySqlConfig.config);
    var sqlRequest = Track.DELETE_TRACK_BY_ID;
    var sqlParams = [track_id];
    if(!(request.currentUser.role_id < 2))
    {
        sqlParams = sqlParams.concat([user_id]);
        sqlRequest +=' AND user_id=?';
        logger.debug(sqlRequest);
        logger.debug(sqlParams);
    }

    connection.query(sqlRequest, sqlParams, function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.affectedRows == 0)
        {
            return response.status(400).send({ message: " track not found"});
        }
        logger.debug(data);
        return response.sendStatus(200);
    });
    connection.end();
};


exports.addTrack= function(request, response){
    const title = request.body.title;
    const genre_id= request.body.genre_id;
    const music_url = request.body.music_url;
    const user_id = request.currentUser.user_id;
    const connection = mysql.createConnection(mySqlConfig.config);
    connection.query( Track.ADD_TRACK
        , [title, music_url, user_id, genre_id], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
    connection.end();
};