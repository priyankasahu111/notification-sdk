var mail = require('../app/email');
var sms = require('../app/sms');


module.exports.sendEmail = mail.sendEmail
module.exports.sendSMS = sms.sendSMS
module.exports.sendSMSTwilio = sms.sendSMSTwilio

