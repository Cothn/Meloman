const path = require('path');
const root_path=path.join(__dirname, '../static/music');
const logger = require('../configs/logger4jsInit')
const multer = require('multer');
const crypto = require('crypto');
const ffmpeg = require('ffmpeg');

const fs = require('fs');
const storage = multer.diskStorage(
    {destination: function (req, file, callback){
                callback(null,  root_path);
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.').reverse()[0];
            var date = new Date();
            var date_str = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            var time_str = date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds()+"-"+date.getMilliseconds();

            callback(null, date_str+"_"+time_str+"_"+crypto.randomBytes(20).toString('hex')+"."+ext);
        }
    });
const fileFilter = (req, file, callback)=>{
    if(file.mimetype === "audio/mpeg"){
        callback(null, true);
    }
    else
    {
        callback(null, false);
    }
}

exports.addTrack= function(request, response){

    var upload = multer({storage: storage, fileFilter: fileFilter}).single('file_data');
    upload(request, response, function (err) {
        if(err){
            return response.status(400).send({message: "Error uploading file:"+err.message});
        }
        if(request.file == null){
            return response.status(400).send({message: "Invalid file"});
        }

        console.log(__dirname);
        logger.debug(__dirname);
        var ext = request.file.filename.split('.').reverse()[0];
        if(ext == "blob") {

            var blob_path = path.join(root_path, request.file.filename);
            logger.debug(blob_path );
            var ffmpeg_process = new ffmpeg(blob_path);
            ffmpeg_process.then(function (blob_file) {

                //blob_file.fnExtractSoundToMP3(request.file.path+"."+"mp3", function(err, file) {
                blob_file.fnExtractSoundToMP3(blob_path +".mp3", function(err, file) {
                    if (err) logger.error(err);
                    else {

                        logger.info('file added as mp3');

                        fs.unlink(blob_path, function (err) {
                            if (err) logger.error(err);

                            logger.info('file deleted');
                            request.file.filename = request.file.filename + "." + "mp3";
                            return response.status(200).send({file_path: "/music/" + request.file.filename});
                        });
                    }
                });
            }, function (err) {
                logger.error( err);
            });
        }
        else{
            return response.status(200).send({file_path: "/music/" + request.file.filename});
        }

    });

};