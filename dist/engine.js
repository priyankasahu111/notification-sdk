var mail = require('../app/email');
var sms = require('../app/sms');
var generateTemplate = require('../app/generateTemplate.controller')
var generateSMS = require('../app/generateSMS.controller')


module.exports.sendEmail = mail.sendEmail
module.exports.sendSMS = sms.sendSMS
module.exports.sendSMSTwilio = sms.sendSMSTwilio
module.exports.generateTemplate = generateTemplate.generateTemplate
module.exports.sendMail = generateTemplate.sendMail
module.exports.sendSMSTextLocal = generateSMS.sendSMSTextLocal
module.exports.sendSMS = generateSMS.sendSMS



