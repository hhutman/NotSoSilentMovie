var database = require("../config/database");
var crypto = require('crypto');

var contentmodel = database.contentmodel;


function getUniqueName(baseName, callback, number){
    var tryName = baseName;

    if(number){
        tryName += "_" + number;
        number++;
    } else {
        number = 1;
    }

    database.checkResourceNameExists(tryName, function(exists){
        if(!exists){
            callback(tryName);
        } else {
            getUniqueName(baseName, function(newName){
                callback(newName);
            }, number )
        }
    });
}

function getUniqueHash(finalName, callback){
    var hashedName = crypto.createHash('md5').update(finalName).digest('hex');
    database.checkResourceTargetExists(hashedName, function(exists){
        if(!exists){
            callback(hashedName);
        } else {
            getUniqueHash(hashedName, function(hashedName){
                callback(hashedName);
            })
        }
    });
}

function getUseType(extension){
    return "video"; //TODO
}

function saveNewFile(hashedName, extension, name, callback){
    var newAddition = new contentmodel;
    newAddition.name = name;
    newAddition.extension = extension;
    newAddition.target = hashedName;
    newAddition.useType = getUseType(extension);

    newAddition.save(function (err, object) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log('saved successfully:', name);
            callback(null, hashedName);
        }
    });
}

module.exports.getUniqueName = function (baseName, callback, number){
    getUniqueName(baseName, callback, number);
};
module.exports.getUniqueHash = function (finalName, callback){
    getUniqueHash(finalName, callback);
};
module.exports.saveNewFile = function(hashedName, extension, name, callback){
    saveNewFile(hashedName, extension, name, callback);
};