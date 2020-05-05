
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
        //console.log(request.file);

        return response.status(200).send({file_path: "/music/" + request.file.filename});
    });

};