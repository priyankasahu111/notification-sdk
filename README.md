# notification-sdk
A microservice that can be used by other applications to send notifcation via mail/sms

## SDK for developers
The notification-sdk helps developers to send notification using mai/sms for any application.

## Deployment
The project is hosted on GitHub. 

### Prerequisites
Make sure you have Node.js 8.9.0 or higher installed. If not, install it.

```sh
# Check your node version using this command
node --version
```
```sh
# Access the SDK using below command within the project directory
npm install crud-sdk

# To save and install the SDK in your application package.json use below command within the project directory.
npm install -S crud-sdk
```

## How to use crud-sdk
```sh
var notification = require('notification-sdk');




# Send mail
notification.sendEmail({GatewayDetails Details in JSON Format}, {msgDetails details in JSON format}, function (err, data) {
            if (err) // do something
});

#For Example
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
    
    
            notification.sendEmail(connectionString, mailDetail, function (err, data) {
                if (err) {
                    console.error(err);
                }
            });
    

# Send Sms
notification.sendEmail({Connection Details in JSON Format}, {mailDetail details in JSON format}, function (err, data) {
            if (err) // do something
});

#For Example

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


        notification.sendSMS(GatewayDetails, msgDetails, function (err, data) {
            if (err) {
                console.error(err);
            }
        });
```