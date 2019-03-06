var crud = require('crud-sdk');
var Q = require('q');
var config = require('../config/config.json');
var notification = require('../app/email');
var service = {};

service.saveMailInfo = saveMailInfo;
service.sendMail = sendMail;

module.exports = service;

function saveMailInfo(body) {


    var dbDetails = body.dbDetails;


    console.log("BODY PRINTED : ", body);

    var placeholder = body.placeholder;

    var dateString  = body.createDate;
    var dateParts = dateString.split("-");

    
    //var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    var dateObject = new Date(dateParts[1] + '-' +dateParts[0]+ '-' +dateParts[2]);
    dateObject.setMinutes(dateObject.getMinutes() + 330);

    var deferred = Q.defer();

    var tempCollectionName = "NotificationTemplate";
    var condition = { "name": body.tempName, "appName": body.appName };
    var paramNotReq = {};

    crud.readByCondition(dbDetails.connectionStringForSDk, dbDetails.dbName, tempCollectionName, condition, paramNotReq, function (err, templateInfo) {

        console.log("Template Name : ", templateInfo);

        var templateData = templateInfo[0];

        var emailBody = templateData.emailBody;
        var smsBody = templateData.smsBody;
        var emailSubject = templateData.subject;


        var keys = Object.keys(placeholder);
        for (var i = 0; i < keys.length; i++) {
            console.log(keys[i]);
            emailBody = emailBody.replace(keys[i], placeholder[keys[i]]);
            smsBody = smsBody.replace(keys[i], placeholder[keys[i]]);
            emailSubject = emailSubject.replace(keys[i], placeholder[keys[i]]);

        }

        console.log("Email Body " + emailBody)
        console.log("SMS Body " + smsBody)


        var dataSet = {
            emailSub: emailSubject,
            emailBody: emailBody,
            smsBody: smsBody,
            emailStatus: '0',
            smsStatus: '0',
            receiverMailId: body.receiverMailId,
            ccMailId: body.ccMailId,
            bccMailId: body.bccMailId,
            receiverPhoneNo: body.receiverPhoneNo,
            appId: body.appName,
            ModuleId: "Consent",
            title: "",
            emailDate: new Date(),
            smsDate: new Date(),
            createDate: new Date()
        }

        var notiCollectionName = "Notification";


        crud.create(dbDetails.connectionStringForSDk, dbDetails.dbName, notiCollectionName, dataSet, function (err, data) {
            if (err) {
                var error1 = "some error occurs"
                deferred.reject(error1);
            }
            console.log("data after adding entry==>", data)
            deferred.resolve(data);
        });
    });
    return deferred.promise;

}



async function sendMail(body) {


    var dbDetails = body.dbDetails;

    var emailConfig = body.emailConfig;

    var mailBody = body.mailBody;


    var deferred = Q.defer();

    var collectionName = "Notification";
    var condition = {};
    condition["emailStatus"] = '0';
    condition["createDate"] = {$lte: new Date()};
    var paramNotReq = {};

    crud.readByCondition(dbDetails.connectionStringForSDk, dbDetails.dbName, collectionName, condition, paramNotReq, async function (err, emailInfo) {
        console.log("after querying emailInfo", err);
        // console.log("after querying emailInfo", emailInfo)
        if (err) {
            var error2 = "some error occurs"
            deferred.resolve(error2);
        }
        if (emailInfo.length) {
            var connectionString = {
                "service": emailConfig.service,
                "host": emailConfig.host,
                "user": emailConfig.user,
                "pass": emailConfig.pass,
                "secure": emailConfig.secure,
                "requireTLS": emailConfig.requireTLS,
                "ciphers": emailConfig.ciphers,
                'port': emailConfig.port
            }



            for (var i = 0; i < emailInfo.length; i++) {
                await new Promise(next => {

                    var notificationData = emailInfo[i];

                    console.log("emailInfo ======>", notificationData)


                    // setTimeout(() => {
                    var mailDetail = {
                        "to": notificationData.receiverMailId,
                        "cc": notificationData.ccMailId,
                        "bcc": notificationData.bccMailId,
                        "subject": notificationData.emailSub,
                        "attachmentPath": mailBody.attachmentPath,
                        "fileName": mailBody.fileName,
                        "emailBody":notificationData.emailBody
                    }

                    notification.sendEmail(connectionString, mailDetail, async function (err, data) {
                        if (err) {
                            console.log("DB function called inside error ", notificationData);

                            // bind the collection based on appName
                            var updateData = {};
                            updateData["emailStatus"] = "3";
                            condition["createDate"] = {$lte: new Date()};
                            var conditionForUpdate = {};
                            conditionForUpdate["_id"] = notificationData._id
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
                        } else {
                            console.log("inside success", notificationData.receiverMailId)
                            var updateData = {};
                            updateData["emailStatus"] = "2";
                            condition["createDate"] = {$lte: new Date()};
                            var conditionForUpdate = {};
                            conditionForUpdate["_id"] = notificationData._id
                            crud.update(dbDetails.connectionStringForSDk, dbDetails.dbName, collectionName, updateData, conditionForUpdate, async function (err, response) {
                                if (err) {
                                    console.error(err);
                                    deferred.reject(err);
                                    next()
                                }
                                if (response.length) {
                                    console.log("db updated inside success of sending mail")
                                    next()
                                    deferred.resolve(response);
                                } else {
                                    console.log("not db updated inside success of sending mail")
                                    var err1 = "not upadted";
                                    next()
                                    deferred.resolve(err1);
                                }
                            })
                        }

                        console.log("after mail sending result is", data)
                    });
                    // }, 2000)
                })
            }
        }
    });
    return deferred.promise;
}
