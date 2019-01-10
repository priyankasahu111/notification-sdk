var generateSMSService = require('../services/generateSMS.service');


function sendSMS(smsData,callback) {
    console.log("generate SMS function");

    generateSMSService.sendSMS(smsData).then(function (data) {
        console.log("And now we get data here", data)
        if (data.status == 'inserted') {
            generateMailService.sendSMS(data._id).then(function (result) {
                console.log("after sending SMS", result)
            return callback('',result);

            })
        }
    });
}


function sendSMSTextLocal(smsData,callback) {
    console.log("generate SMS function");

    generateSMSService.sendSMSTextLocal(smsData).then(function (data) {
        console.log("And now we get data here", data)
        if (data.status == 'inserted') {
            generateMailService.sendSMS(data._id).then(function (result) {
                console.log("after sending mail", result)
                return callback('',result);

            })
        }
    });
}

module.exports.sendSMSTextLocal = sendSMSTextLocal;
module.exports.sendSMS = sendSMS;