"use strict";
var resourceController = require('../resourcecontroller');
var database = require('../../config/database');

module.exports.analyzeUseType = function(file) {
    let newUseType = resourceController.getUseType(file.extension);
    if(newUseType == file.useType){
        return;
    }

    file.useType = newUseType;
    database.updateByTarget(file)

};