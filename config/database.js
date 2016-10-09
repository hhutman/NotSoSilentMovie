var Promise = require("bluebird");

var mongodb = require('mongodb');
var mongoose = Promise.promisifyAll(require('mongoose'));
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

module.exports.checkResourceNameExists = function(tryName){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    Content.find({name : tryName}, function (err, docs) {
        if (docs.length){
            resolve(docs)
        }else{
            resolve(null);
        }
    });

    return newPromise;
};

module.exports.checkResourceTargetExists = function(target){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });


    Content.find({target : target}, function (err, docs) {
        if (docs.length){
            resolve(docs)
        }else{
            resolve(null);
        }
    });

    return newPromise;
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

module.exports.getContent = function(){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    MongoClient.connect(MONGO_ADDRESS)
        .then(function(database) {
            var collection = database.collection('contents');
            return collection.find().toArray()
        })
        .then(function (data) {
            resolve(data);
        })
        .catch(function(err){
            reject(err);
        });

    return newPromise;
};
module.exports.deleteByTarget = function(target){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    Content.remove({ target: target })
        .then( function(data) {
            resolve(data);
        })
        .catch(function(data) {
            reject(data);
        });

    return newPromise;
};
module.exports.getByTarget = function(target){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    Content.findOne({ target: target })
        .then(function(content) {
            resolve(content);
        })
        .catch(function(err){
            reject(err);
        });

    return newPromise;
};
module.exports.updateByTarget = function(file){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });


    Content.findOne({ target: file.target })
        .then(function(foundFile) {
            if(!foundFile){
                reject();
            } else {
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
                resolve();
            }
        })
        .catch(function(err) {
            reject(err);
        });

    return newPromise;
};