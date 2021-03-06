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
npm install notification-sdk

# To save and install the SDK in your application package.json use below command within the project directory.
npm install -S notification-sdk
```

## How to use notification-sdk
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
        "user" : "jhi@gmail.com",
        "pass" : "password"
    }
    
    var mailDetail = {
        "to" : "abc@gmail.com",
        "cc" : "pqr@gmail.com ",
        "bcc" : "xyz@gmail.com ",
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
    "user": "xys@gmail.com",
    "hash"   : "6b3029135a63d10c135c7288sdfsdfds0c759be2eea761bdac1b0975c0112dfd920a55fb",
    "sender" :  "txtlfdsfdscl",
    "apiKey" : "Njli+lo8se-96YPODsdfdsfdsJbzXrXE6JvcJEA3Bbd0csscC"
}

var msgDetails = {
    "mobilleNumber" : "789654****",
    "smsBody" : "TESTING "
}


        notification.sendSMS(GatewayDetails, msgDetails, function (err, data) {
            if (err) {
                console.error(err);
            }
        });
```