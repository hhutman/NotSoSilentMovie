"use strict";
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
    description: String,
    content: [{
        target: String,
        text: String
    }],
    tags: Array
});

module.exports = project;
