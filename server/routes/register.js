var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var url = 'mongodb://localhost:27017/test';
var s3 = require('s3');
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs =require('fs-extra');    //File System-needed for renaming file etc
var fs = require('fs');


router.post('/', function(req, res, next) {
  var client = s3.createClient({
    maxAsyncS3: 20,     // this is the default 
    s3RetryCount: 3,    // this is the default 
    s3RetryDelay: 1000, // this is the default 
    multipartUploadThreshold: 20971520, // this is the default (20 MB) 
    multipartUploadSize: 15728640, // this is the default (15 MB) 
    s3Options: {
      accessKeyId: process.env.S3AK,
      secretAccessKey: process.env.S3SK,
      // any other options are passed to new AWS.S3() 
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property 
    },
  });
  console.log(req)
  var params = {
    localFile: req.image.thumbnail.path,

    s3Params: {
      Bucket: "dapapp",
      Key: "img/image.jpg",
      // other options supported by putObject, except Body and ContentLength. 
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
    },
  };
  console.log(req.body.image);
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
      uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
    res.send("Done!");
  });


  // // get the temporary location of the file
  // var tmp_path = req.files.thumbnail.path;
  // // set where the file should actually exists - in this case it is in the "images" directory
  // var target_path = './public/images/' + req.files.thumbnail.name;
  // // move the file from the temporary location to the intended location
  // fs.rename(tmp_path, target_path, function(err) {
  //   if (err) throw err;
  //     // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
  //     fs.unlink(tmp_path, function() {
  //       if (err) throw err;
  //       res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
  //     });
  //   });
});

module.exports = router;