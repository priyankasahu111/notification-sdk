var sms = require('../app/sms.js');
var email = require('../app/email.js');


describe('SendEmail', function () {


    var connectionString = {
        "service": "gmail",
        "host"   : "smtp.gmail.com",
        "user" : "giri.cateina@gmail.com",
        "pass" : "shank@0601"
    }
    
    var mailDetail = {
        "to" : "priyanka@cateina.com",
        "cc" : "giri@cateina.com ",
        "bcc" : "prnksh30@gmail.com ",
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
    "user": "rajish.cateina@gmail.com",
    "hash"   : "6b3029135a63d10c135c72880c759be2eea761bdac1b0975c0112dfd920a55fb",
    "sender" :  "txtlcl",
    "apiKey" : "Njli+lo8se-96YPODJbzXrXE6JvcJEA3Bbd0csscC"
}

var msgDetails = {
    "mobilleNumber" : "9594176036",
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





