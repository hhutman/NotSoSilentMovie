var mongoose = require('mongoose');

var content = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    movieTitle: String,
    description: String,
    tags: Array
});

module.exports = content;