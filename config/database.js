var mongodb = require('mongodb');
var contentModel = require('../models/content');
var projectModel = require('../models/project');

var contentCollection;
var projectCollection;

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/silentMovie';

module.exports.pingDatabase = function(){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            db.close();
        }
    });
};