var fs = require('fs');
var path = require('path');


module.exports.determineFileExtension = function (target) {
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    fs.readdir('public/uploaded', function (err, files) {
        if(err){
            reject(err);
        }

        let file = findFile(files, target);
        if(file) {
            resolve(path.extname(file));
        } else {
            reject("[ContentController] Error finding file: " + target)
        }
    });

    return newPromise;
};

function findFile (list, target){
    for(let file in list){
        if( list[file].includes(target)) {
            return list[file];
        }
    }
}