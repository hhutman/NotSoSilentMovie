var mongoose = require('mongoose');

var content = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    useType: { // Can be 'video','card','audio'
        type: String,
        required: true
    },
    target: {
        type: String,
        unique: true,
        required: true
    },
    movieTitle: String,
    description: String,
    tags: Array,
    thumbnailTarget: String
});

module.exports = content;

module.exports.checkFileExtension = function(extension, useType){
    return true;
// TODO
};