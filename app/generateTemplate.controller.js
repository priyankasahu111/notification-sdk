
var generateMailService = require('../services/generateEmail.service');

function generateTemplate(templateDetial, callback) {
    try {

        console.log("generate email function "+templateDetial);

        generateMailService.saveMailInfo(templateDetial).then(function (data) {
            console.log("And now we get data here", data)
            return callback('',data);
        }).catch(function (err) {
            console.log("And now we get error here", err)
            return callback(err,'');
        })

    } catch (err) {
        throw err;
    }

}


function sendMail(mailData,callback) {
    console.log("send email function "+mailData);

    // generateMailService.saveMailInfo(req.body).then(function (data) {
    //     console.log("And now we get data here", data)
        generateMailService.sendMail(mailData).then(function (result) {
            console.log("after sending mail", result)
            return callback('',result);
        }).catch(function (err) {
            console.log("And now we get error while sending mail ", err)
            return callback(err,'');
        })
    // }).catch(function (err) {
    //     console.log("And now we get error here", err)
    // })
}


module.exports.generateTemplate = generateTemplate;
module.exports.sendMail = sendMail;