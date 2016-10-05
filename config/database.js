var mongodb = require('mongodb');
var mongoose = require('mongoose');
var contentModel = require('../models/content');
var projectModel = require('../models/project');

var MONGO_ADDRESS = 'mongodb://localhost/silentMovie';

mongoose.connect(MONGO_ADDRESS);

mongoose.Promise = require('bluebird');

var MongoClient = mongodb.MongoClient;


// Setting up schemas
var Content = mongoose.model('Content', contentModel);
var Project = mongoose.model('Project', projectModel);


module.exports.contentmodel = Content;
module.exports.projectmodel = Project;

module.exports.checkResourceNameExists = function(tryName, callback){
    Content.find({name : tryName}, function (err, docs) {
        if (docs.length){
            callback(docs)
        }else{
            callback(null);
        }
    });
};

module.exports.checkResourceTargetExists = function(target, callback){
    Content.find({target : target}, function (err, docs) {
        if (docs.length){
            callback(docs)
        }else{
            callback(null);
        }
    });
};

module.exports.addContent = function(hashedName, extension, name, useType){
    var newAddition = new Content();
    newAddition.name = name;
    newAddition.extension = extension;
    newAddition.target = hashedName;
    newAddition.useType = useType;

    newAddition.save(function (err, object) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', name);
        }
    });
};

module.exports.getContent = function(callback){
    MongoClient.connect(MONGO_ADDRESS, function(err, db) {
        if(err) { callback(err, null) }

        var collection = db.collection('contents');

        collection.find().toArray(function(err, list) {
            callback(err, list);
        });
        db.close();
    });
};
module.exports.deleteByTarget = function(target, callback){
    Content.remove({ target: target }, function(err) {
        if (err) {
            console.log(err);
            callback('Error');
        }
        else {
            callback('Success');
        }
    });
};
module.exports.getByTarget = function(target, callback){
    Content.findOne({ target: target }, function(err, file) {
        if (err || file == null) {
            callback('Error', null);
        }
        else {
            callback( null, file);
        }
    });
};
module.exports.updateByTarget = function(file, callback){
    Content.findOne({ target: file.target }, function(err, foundFile) {
        if (err || foundFile == null) {
            callback('Error', null);
        }
        else {
            if(file.name){
                foundFile.name = file.name;
            }
            if(file.useType){
                foundFile.useType = file.useType;
            }
            if(file.description){
                foundFile.description = file.description;
            }
            if(file.movieTitle){
                foundFile.movieTitle = file.movieTitle;
            }
            if(file.tags){
                foundFile.tags = file.tags;
            }
            foundFile.save();
            callback( null, file);
        }
    });
};