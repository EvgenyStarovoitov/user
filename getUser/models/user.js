var db = require('../public/libs/db'); // can disable
// var ObjectID = require('mongodb').ObjectID;

exports.create = function (user, collect, cb) {    
    collect.insert(user, function (err, result) {
        cb(err, result);
    });    
};

exports.getUser = function (query, collect, cb) { 
    collect.findOne( query, function(err , result){
        cb(err, result); 
    });
};

exports.getAllUsers = function(collect, cb){
    collect.find().toArray(function(err, result){
        cb(err, result);
    });
};