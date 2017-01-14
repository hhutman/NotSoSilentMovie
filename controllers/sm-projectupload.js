"use strict";
var database = require("../config/database");
var resourceController = require('../controllers/resourcecontroller');
var Promise = require("bluebird");
var socket = require("../config/sm-socket");

Promise.promisifyAll(resourceController);
Promise.promisifyAll(database);

module.exports.newUpload = function(project) {
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    console.log("Received New Project: " + project.name);
    database.addProject(project.name, project.creator, project.description, project.content, project.tags)
        .then(function (name) {
            console.log ("Project <" + name + "> uploaded successfully");
            socket.newMovie();
            resolve(name);
        })
        .catch(function(err){
            console.log("Error uploading project [" + project.name + "]: " + err.message);
            reject(err);
        });

    return newPromise;
};