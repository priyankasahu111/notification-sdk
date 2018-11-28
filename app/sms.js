#!/usr/bin/env node

/**
 * @author Priyanka Sahu
 * @version 1.0.0
 * @since 18-November-2018
 */
var http = require('http');                                             // call http lib
var urlencode = require('urlencode');                                   // currently we were use for txtlocal        

/**
 * @author Priyanka Sahu
 * @description Insert data in MongoDB
 * @param {connectionString,dbName,collectionName,jsonData} req 
 * @param {JSONObject} result 
 */
function sendSMS(GatewayDetails, msgDetails, callback) {
    try {

        console.log("TEST GatewayDetails : "+GatewayDetails)
        console.log("TEST msgDetails : "+msgDetails)

        var user   = GatewayDetails.user;
        var hash   = GatewayDetails.hash;
        var sender =  GatewayDetails.sender;
        var apiKey = GatewayDetails.apiKey;

        var mobilleNumber = msgDetails.mobileNumber;
        var smsBody = urlencode(msgDetails.smsBody);
        var data = 'username=' + user + '&hash=' + hash + '&sender=' + sender + '&numbers='
                     + mobilleNumber + '&message=' + smsBody;
        
        // console.log("final data : ",data);             
        var key = urlencode('apikey='+apiKey);

        var options = {
            host: GatewayDetails.host, path: '/send?' + data
        };

        callback = function (response) {
            var str = '';                               //another chunk of data has been recieved, so append it to `str`
            // console.log('response ==>',response);
            response.on('data', function (chunk) {
                // console.log('chunk ==>',chunk);
                str += chunk;
                return callback(str);

            });                                         //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                // console.log('str ==>',str);
                return callback(data);

            })
        }        
        http.request(options, callback).end();

    } catch (err) {
        throw err;
    }

}


function sendSMSTwilio(GatewayDetails, msgDetails, callback) {
    try {

        // var MessagingResponse = require('twilio').twiml.MessagingResponse;
        var accountSid = 'AC4869862731b1d38c641d5e88eec7098e';  //ComGo Account details
        var authToken = '875bcb10dfce2ed72030d1b76fcc7e40';     //ComGo Account details
        var twilioNumber = '+14302201214';                      //ComGo Account details
        
        var client = require('twilio')(accountSid, authToken);
        
        client.messages
          .create({
            to: "9594176036",
            from: twilioNumber,
            body: 'Hi this is test sms',
          })
          .then(message =>
            console.log("sms sent token => ", message)
          ).catch(error => 
          console.log("error to send sms -> ",error)
          );

    } catch (err) {
        throw err;
    }

}

module.exports.sendSMS = sendSMS;
module.exports.sendSMSTwilio = sendSMSTwilio;
