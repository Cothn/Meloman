
const logger = require('../configs/logger4jsInit')
const multer = require('multer');
const crypto = require('crypto');

const fs = require('fs');
const storage = multer.diskStorage(
    {destination: function (req, file, callback){
                callback(null,  "./static/music");
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.').reverse()[0];
            callback(null, Date.now()+"_"+crypto.randomBytes(20).toString('hex')+"."+ext);
        }
    });

exports.addTrack= function(request, response){

    var upload = multer({storage: storage}).single('file_data');
    upload(request, response, function (err) {
        if(err){
            return response.status(500).send({message: "Error uploading file"});
        }
        //console.log(request.file);
        return response.status(200).send({file_path:request.file.path});
    });

};