var Ffmpeg = require('fluent-ffmpeg');
var path = require('path');

const ffmpegPath = path.join(__dirname, '../tools/ffmpeg-3.2/bin/');
Ffmpeg.setFfmpegPath(ffmpegPath + "ffmpeg.exe");
Ffmpeg.setFfprobePath(ffmpegPath + "ffprobe.exe");

module.exports.makeThumbnailByTarget = function (target) {
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
                size: '150x150'
            },
            './public/thumbnails');

};
