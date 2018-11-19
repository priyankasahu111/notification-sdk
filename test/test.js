var sms = require('../app/sms.js');
var email = require('../app/email.js');


describe('SendEmail', function () {


    var connectionString = {
        "service": "gmail",
        "host"   : "smtp.gmail.com",
        "user" : "xyz@gmail.com",
        "pass" : "password"
    }
    
    var mailDetail = {
        "to" : "xyz@cateina.com",
        "cc" : "xyz@cateina.com ",
        "bcc" : "xyz@gmail.com ",
        "subject" : "TESTING ",
        "mailBody" : "TESTING "
    }
    
    
        it('Send Email', function (done) {
            email.sendEmail(connectionString, mailDetail, function (err, data) {
                if (err) {
                    console.error(err);
                }
                console.log(data);
                done();
            });
        });
    
    });

describe('SendSms', function () {

    console.log("HI SMS ");

var GatewayDetails = {
    "user": "xyz@gmail.com",
    "hash"   : "6b302913dsd5a63d10c135c72880c759besadfsfsdf2eea761bdac1b0975c0112dfd920a55fb",
    "sender" :  "asdfg",
    "apiKey" : "Njli+lo8se-96YPODJbzXsdfdsfsdrXE6JvcJEA3Bbd0csscC"
}

var msgDetails = {
    "mobilleNumber" : "789632****",
    "smsBody" : "TESTING "
}


    it('Send sms', function (done) {
        sms.sendSMS(GatewayDetails, msgDetails, function (err, data) {
            if (err) {
                console.error(err);
            }
            console.log(data);
            done();
        });
    });

});





