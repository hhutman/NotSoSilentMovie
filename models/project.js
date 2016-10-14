var mongoose = require('mongoose');

var project = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    target: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    content: {
        type: Array,
        required: true
    },
    tags: Array
});

module.exports = project;
