var crud = require('crud-sdk');
var Q = require('q');
var config = require('../config/config.json');
var service = {};
var _ = require('lodash');                                              // Load the full build. for manipulating objects and collections


var collectionName = "NotificationTemplate";

service.getMailTemplate = getMailTemplate;
service.getTemplateData = getTemplateData;
service.saveMailTemplate = saveMailTemplate;
service.updateTemplate = updateTemplate;


module.exports = service;

function getMailTemplate() {
    var deferred = Q.defer();

            crud.readByCondition(config.connectionStringForSDk, config.dbName, collectionName,{},{}, function (err, data) {
                if (err) {
                    console.log("ERROR : "+err)
                    var error1 = "some error occurs"
                    deferred.reject(error1);
                }
                console.log("data after adding entry==>", data)
                deferred.resolve(data);
            });


    return deferred.promise;
}


function getTemplateData(dataSet) {

console.log("Read By condition : ",dataSet.id);

    var deferred = Q.defer();

            crud.readById(config.connectionStringForSDk, config.dbName, collectionName,dataSet.id,{}, function (err, data) {
                if (err) {
                    console.log("ERROR : "+err)
                    var error1 = "some error occurs"
                    deferred.reject(error1);
                }
                console.log("data after adding entry==>", data)
                deferred.resolve(data);
            });


    return deferred.promise;
}

function saveMailTemplate(dataSet) {
    var deferred = Q.defer();
    var dataSet = _.omit(dataSet, '_id');                        // set user object to req.body without the cleartext password

    crud.create(config.connectionStringForSDk, config.dbName, collectionName, dataSet, function (err, data) {
        if (err) {
            var error1 = "some error occurs"
            deferred.reject(error1);
        }
        console.log("data after adding entry==>", data)
        deferred.resolve(data);
    });


    return deferred.promise;
}

function updateTemplate(dataSet) {


    var condition = {}
    condition["subject"] = dataSet.subject

    console.log("UPDATE DATA ",dataSet)

    var dataSet = _.omit(dataSet, '_id');                        // set user object to req.body without the cleartext password

    console.log("UPDATE DATA AFTER ",dataSet)

    console.log("CONDITION : ",condition);

    
    var deferred = Q.defer();

    crud.update(config.connectionStringForSDk, config.dbName, collectionName, dataSet,condition, function (err, data) {
        if (err) {
            console.log("ERROR UPDATE : "+err);
            var error1 = "some error occurs"
            deferred.reject(error1);
        }
        console.log("data after adding entry==>", data)
        deferred.resolve(data);
    });

    return deferred.promise;
}
