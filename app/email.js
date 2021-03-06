#!/usr/bin/env node

/**
 * @author Priyanka Sahu
 * @version 1.0.0
 * @since 18-November-2018
 */
var nodemailer = require("nodemailer");                                 // require for sending e-mail


/**
 * @author Priyanka Sahu
 * @description Insert data in MongoDB
 * @param {connectionString,dbName,collectionName,jsonData} req 
 * @param {JSONObject} result 
 */
function sendEmail(connectionString, mailDetail, callback) {
    try {

        console.log("TEST connectionString : " + connectionString)
        console.log("TEST mailDetail : " + mailDetail)


        var to = mailDetail.to;
        var mailBody = mailDetail.mailBody;
        var sub = mailDetail.subject;
        var emailBody = mailDetail.emailBody;
        var cc = mailDetail.cc;
        var bcc = mailDetail.bcc;

        if (mailDetail.attachmentPath != null) {
            var attachmentPath = mailDetail.attachmentPath;
            var fileName = mailDetail.fileName;
        }


        var smtpTransport = nodemailer.createTransport({
            service: connectionString.service,
            host: connectionString.host,
            port:connectionString.port,
            secure: connectionString.secure,
            requireTLS: connectionString.requireTLS,
            auth: {
                user: connectionString.user,
                pass: connectionString.pass
            },
            tls: {
                ciphers: connectionString.ciphers
            }
        });

        var mailOptions = {
            to: to,
            cc: cc,
            bcc: bcc,
            subject: sub,
            text: emailBody
        }

        if (mailDetail.attachmentPath != null) {
            mailOptions['attachments'] = [{ // file on disk as an attachment
                filename: fileName,
                path: attachmentPath // stream this file
            }]
        }

        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                // deferred.reject('Failed to send E-mail.');
                return callback(error, 'Failed to send E-mail.');

            } else {
                console.log("mail response", response);
                return callback('', response);


            }
        });

        smtpTransport.close();

    } catch (err) {
        throw err;
    }

}

module.exports.sendEmail = sendEmail;
