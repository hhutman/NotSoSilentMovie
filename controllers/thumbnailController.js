"use strict";
var Ffmpeg = require('fluent-ffmpeg');
var path = require('path');
var contentController = require('./contentcontroller');
var Promise = require("bluebird");
var jimp = require("jimp");


Promise.promisifyAll(contentController);

const ffmpegPath = path.join(__dirname, '../tools/ffmpeg-3.2/bin/');
const THUMBNAIL_SIZE = 150;


Ffmpeg.setFfmpegPath(ffmpegPath + "ffmpeg.exe");
Ffmpeg.setFfprobePath(ffmpegPath + "ffprobe.exe");

module.exports.makeThumbnailByTarget = function (target) {
    contentController.determineFileExtension(target)
        .then(function(extension) {
            handleExtension(extension, target);
        })
        .catch(function (err) {
            console.log(err);
        })

};

function handleExtension (extension, target) {
    switch(extension) {
        case '.png' :
            makeImageThumbnail(target);
            break;
        case '.mp4' :
            makeVideoThumbnail(target);
            break;
        default :
            console.log("Thumbnail Creation: Unknown Extension - " + target + " | " + extension);
            break;
    }
}

function makeVideoThumbnail (target){
    const filePath = path.join(__dirname, '../public/uploaded/' + target + ".mp4" );
    console.log("making thumbanil for: " + filePath);
    Ffmpeg(filePath)
        .on('end', function() {
            console.log('Screenshots taken: ' + target);
        })
        .on('error', function(err) {
            console.log('Cannot process video: ' + err);
        })
        .takeScreenshots(
            {
                timestamps: ['50%'],
                filename: target + '.png',
                size: THUMBNAIL_SIZE + 'x' + THUMBNAIL_SIZE
            },
            './public/thumbnails');
}

function makeImageThumbnail (target) {
    jimp.read('./public/uploaded/' + target + ".png" , function (err, image) {
        if (err) throw err;
        image.resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE)            // resize
            .quality(60)                 // set JPEG quality
            .write('./public/thumbnails/' + target + '.png'); // save
    });
}