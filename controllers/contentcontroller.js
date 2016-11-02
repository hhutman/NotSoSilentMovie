"use strict";
var fs = require('fs');
var path = require('path');


function determineFileExtension (target) {
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    const dirPath = path.join(__dirname, '../public/uploaded/');
    fs.readdir(dirPath, function (err, files) {
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

function filterByExtension (targetList, extension) {
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    filterByExtensionRecursive(targetList, 0, extension)
        .then(function (videoList) {
            resolve(videoList);
        })
        .catch(function(err) {
            reject(err);
        });
    return newPromise;
}

function filterByExtensionRecursive( list, index, extension ) {
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    if(index >= list.length){
        reject("Index out of bounds");
        return;
    }
    let newList = [];
    determineFileExtension(list[index])
        .then(function(ext){
            if(ext == extension) { //TODO add more extensions
                newList.push(list[index]);
            }
            return filterByExtensionRecursive(list, index + 1, extension);
        })
        .then(function (list) {
            if(list){
                resolve(newList.concat(list));
            }
            resolve(newList);
        })
        .catch(function(err) {
            resolve(newList)
        });
    return newPromise;
}



module.exports.determineFileExtension =  determineFileExtension;
module.exports.filterByExtension = filterByExtension;