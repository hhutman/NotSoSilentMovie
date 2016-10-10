
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var resourceController = require('../controllers/resourcecontroller');
var content = require('../models/content');

var Promise = require("bluebird");

Promise.promisifyAll(resourceController);



module.exports.newUpload = function(req) {
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });


    var form = new formidable.IncomingForm();
    var file = {};


    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../public/uploaded');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, newFile) {
        if(field == "upload"){
            file = newFile;
        }
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
        reject(err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        handleNewFile();
    });


    // parse the incoming request containing the form data
    form.parse(req);

    function handleNewFile() {
        var extension = path.extname(file.name);
        var baseName = path.basename(file.name, extension);

        var finalName = "";

        resourceController.getUniqueName(baseName)
            .then(function (uniqueName) { // Returned unique fileName, Looking for unique hash
                finalName = uniqueName;
                return resourceController.getUniqueHash(uniqueName);
            })
            .then(function (target) { // Returned 'target', File is saving
                fs.rename(file.path, path.join(form.uploadDir, target + extension));
                return resourceController.saveNewFile(target, extension, finalName);
            })
            .then(function (data) {
                resolve (data);
            })
            .catch(function (err) {
                reject(err);
            });
    }

    return newPromise;
};