const Track = require("../models/track.js");
const logger = require('../configs/logger4jsInit')
const mysql = require("mysql2");
const mySqlConfig= require("../configs/mysqlconfig");

let connection = mysql.createConnection(mySqlConfig.config);

exports.getTrackById = function (request, response){
    const id = request.params.id;
    //logger.debug( id);
    connection.query(Track.GET_TRACK_BY_ID, [id], function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        if(data.length == 0)
        {
            return response.status(400).send({message: "track not found"});
        }
        //logger.debug(  { tracks:  data.length});
        return response.status(200).send(data);
    });
};


exports.getTracks = function(request, response){
    //logger.debug( "mess1");
    connection.query(Track.GET_ALL_TRACKS, function(err, data) {
        if(err) {
            return response.status(400).send({message: err.message});
        };
        //logger.debug(  { tracks:  data});
        //response.render("tracks.hbs", { tracks:  data});
        //return response.status(400).send({message: "mm"});
        return response.status(200).send(data);
    });

};

exports.updateTrack = function(request, response) {
    const id = request.body.id;
    const title = request.body.title;
    const genre_id= request.body.genre_id;
    //logger.debug( "mess3");
    //logger.debug(  id);
    connection.query(Track.UPDATE_TRACK,
        [title, genre_id, id], function(err, data) {
            if(err) {
                return response.status(400).send({ message: err.message});
            };
            //logger.debug( "mess4");
            //logger.debug(    data);
            return response.sendStatus(200);
        });
    //response.status(200).send('true');
};

exports.deleteTrack = function(request, response){
    const track_id= request.params.id;
    connection.query(Track.DELETE_TRACK_BY_ID, [track_id], function(err, data) {
        if(err) {
            return response.send({message: err.message});
        };
        return response.sendStatus(200);
    });
};


exports.addTrack= function(request, response){
    const title = request.body.title;
    const genre_id= request.body.genre_id;
    const music_url = request.body.music_url;
    const user_id = request.body.user_id;
    connection.query( Track.ADD_TRACK
        , [title, music_url, user_id, genre_id], function(err, data) {
            if(err) {
                return response.status(400).send({message: err.message});
            };
            //logger.debug(    data);
            return response.status(201).send({insert_id:  data.insertId});
        });
};