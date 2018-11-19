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

module.exports.sendSMS = sendSMS;
