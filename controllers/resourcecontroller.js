"use strict";
var database = require("../config/database");
var crypto = require('crypto');

var contentmodel = database.contentmodel;

var Promise = require("bluebird");

Promise.promisifyAll(database);

function getUniqueName(baseName, number){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    var tryName = baseName;

    if(number){
        tryName += "_" + number;
        number++;
    } else {
        number = 1;
    }

    database.getByJson(database.contentmodel, { name : tryName })
        .then(function(data) {
            return getUniqueName(baseName, number);
        })
        .then(function(uniqueName) {
            resolve(uniqueName);
        })
        .catch(function(data){
            resolve(tryName);
        });

    return newPromise;
}

function getUniqueHash(finalName){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    var hashedName = crypto.createHash('md5').update(finalName).digest('hex');

    database.getByJson(database.contentmodel, {target: hashedName})
        .then(function(data) {
            return getUniqueHash(hashedName);
        })
        .then(function(data) {
            resolve(data);
        })
        .catch(function(data){
            resolve(hashedName);
        });
    return newPromise;
}


function saveNewFile(hashedName, extension, name, filetype){
    var resolve;
    var reject;

    var newPromise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });

    var newAddition = new contentmodel;
    newAddition.name = name;
    newAddition.extension = extension;
    newAddition.target = hashedName;
    newAddition.useType = filetype;

    newAddition.save(function (err, object) {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log('saved successfully:', name);
            resolve( hashedName);
        }
    });

    return newPromise;
}

module.exports.getUniqueName = getUniqueName;
module.exports.getUniqueHash = getUniqueHash;
module.exports.saveNewFile = saveNewFile;