var mongodb = require('mongodb');
var mongoose = require('mongoose');
var contentModel = require('../models/content');
var projectModel = require('../models/project');

var MONGO_ADDRESS = 'mongodb://localhost/silentMovie';

mongoose.connect(MONGO_ADDRESS);
var MongoClient = mongodb.MongoClient;


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
    Content.find({ target: target }, function(err) {
        if (err) {
            console.log(err);
            callback('Error', null);
        }
        else {
            callback( null, 'Success');
        }
    });
};