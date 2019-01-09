var crud = require('crud-sdk');
var Q = require('q');
var config = require('../config/config.json');
var notification = require('../app/sms');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');
var service = {};

var service = {};

service.saveSMSInfo = saveSMSInfo;
service.sendSMS = sendSMS;

module.exports = service;

function saveSMSInfo(body) {

    var dbDetails = body.dbDetails;
    
    var deferred = Q.defer();

    var reqBody = {};
    reqBody = body;
    reqBody['type'] = 'SMS';
    reqBody['type'] = 'Not send';

    var collectionName = "Notification";

    crud.create(dbDetails.connectionStringForSDk, dbDetails.dbName, collectionName, reqBody, function (err, data) {
        if (err) {
            var error1 = "some error occurs"
            deferred.resolve(error1);
        }
        console.log("data after adding entry==>", data)
        deferred.resolve(data);
    });
    return deferred.promise;
}

async function sendSMS(body) {

    var dbDetails = body.dbDetails;
    var deferred = Q.defer();

    var collectionName = "Notification";
    var condition = {};
    condition["smsStatus"] = '0';
    var paramNotReq = {};

    crud.readByCondition(dbDetails.connectionStringForSDk, dbDetails.dbName, collectionName, condition, paramNotReq,async function (err, SMSInfo) {
        console.log("after querying sendSMS", err);
        console.log("after querying sendSMS", SMSInfo)
        if (err) {
            var error2 = "some error occurs"
            deferred.resolve(error2);
        }
        if (SMSInfo.length) {
            console.log("data ======>", SMSInfo)

            var GatewayDetails = {
                "accountSid": config.accountSid,
                "authToken": config.authToken,
                "twilioNumber": config.twilioNumber
            }

            for (var i = 0; i < SMSInfo.length; i++) {
                await new Promise(next => {
                var smsData =  SMSInfo[i];

                    console.log("SMS NUMBER : "+smsData.receiverPhoneNo);

                var msgDetails = {
                    "mobilleNumber": smsData.receiverPhoneNo,
                    "smsBody":smsData.smsBody
                }


                notification.sendSMSTwilio(GatewayDetails, msgDetails, async function (err, data) {
                    if (err) {
                        console.error("ERROR WHILE SENDING SMS ",err);

                        var updateData = {};
                        updateData["smsStatus"] = "3";
                        var conditionForUpdate = {};
                        conditionForUpdate["_id"] = smsData._id
                        crud.update(dbDetails.connectionStringForSDk, dbDetails.dbName, collectionName, updateData, conditionForUpdate, async function (err, response) {
                            if (err) {
                                console.error(err);
                                deferred.reject(err);
                                next()
                            }
                            if (response.length) {
                                console.log("db updated inside error of sending mail")
                                next()
                                deferred.resolve(response);
                            } else {
                                console.log("not db updated inside error of sending mail")
                                var err1 = "not upadted";
                                next()
                                deferred.resolve(err1);
                            }
                        })
                    }
                    else{
                        console.error("SMS SENT ",data);

                        var updateData = {};
                        updateData["smsStatus"] = "2";
                        var conditionForUpdate = {};
                        conditionForUpdate["_id"] = smsData._id
                        crud.update(dbDetails.connectionStringForSDk, dbDetails.dbName, collectionName, updateData, conditionForUpdate, async function (err, response) {
                            if (err) {
                                console.error(err);
                                deferred.reject(err);
                                next()
                            }
                            if (response.length) {
                                console.log("db updated inside error of sending mail")
                                next()
                                deferred.resolve(response);
                            } else {
                                console.log("not db updated inside error of sending mail")
                                var err1 = "not upadted";
                                next()
                                deferred.resolve(err1);
                            }
                        })

                    }
                    deferred.resolve(data)
                });
            })
            }
        }
    });
    return deferred.promise;
}