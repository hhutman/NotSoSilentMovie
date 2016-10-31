var database = require("../config/database");
var resourceController = require('../controllers/resourcecontroller');
var Promise = require("bluebird");

Promise.promisifyAll(resourceController);
Promise.promisifyAll(database);

module.exports.newUpload = function(project) {
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    database.addProject(project.name, project.creator, project.description, project.content, project.tags)
        .then(function (name) {
            resolve(name);
        })
        .catch(function(err){
            reject(err);
        });

    return newPromise;
};