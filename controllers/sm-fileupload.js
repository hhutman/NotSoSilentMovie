
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var resourceController = require('../controllers/resourcecontroller');
var content = require('../models/content');



module.exports.newUpload = function(req) {
    var resolve;
    var reject;
    var form = new formidable.IncomingForm();
    var file = {};

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });




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
        reject();
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        handleNewFile(function(err, target){
            if(err) {
                reject();
            }
            resolve(target);
        });
    });


    // parse the incoming request containing the form data
    form.parse(req);

    function handleNewFile(callback){
        try {
            var extension = path.extname(file.name);
            var baseName = path.basename(file.name, extension);


            resourceController.getUniqueName(baseName, function(finalName){
                resourceController.getUniqueHash(finalName, function(target){
                    saveFile(finalName, target, extension, callback);
                });
            });
        } catch (err) {
            callback(err, null);
        }
    }

    function saveFile(name, target, extension, callback){
        fs.rename(file.path, path.join(form.uploadDir, target));
        resourceController.saveNewFile(target, extension, name, function(){
            callback(null, target);
        });
    }

    return newPromise;
};