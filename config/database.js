var mongoose = require('mongoose');
var contentModel = require('../models/content');
var projectModel = require('../models/project');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
mongoose.connect('mongodb://localhost/silentMovie');

// Setting up schemas
var Content = mongoose.model('Content', contentModel);
var Project = mongoose.model('Project', projectModel);

module.exports.addContent = function(hashedName, extension, name){
    var newAddition = new Content();
    newAddition.name = name;
    newAddition.fileType = extension;
    newAddition.target = hashedName;

    newAddition.save(function (err, object) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', object);
        }
    });
};