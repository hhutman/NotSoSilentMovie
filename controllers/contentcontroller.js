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
        resolve(path.extname(file));
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