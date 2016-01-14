var express = require("express");
var router = express.Router();
var Promise = require('bluebird');

router.get('/text', function(req, res){
    var textMessage = {
        phoneNumber: req.query.phoneNumber,
        message: req.query.message
    };

    //console.log(textMessage);
    // Your accountSid and authToken from twilio.com/user/account
    var twilio = require('twilio');
    var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    function sendMessage() {
        return new Promise(function() {
            for (var i = 0; i < textMessage.phoneNumber.length; i++) {

                client.sms.messages.create({
                    to: "+1" + textMessage.phoneNumber[i],
                    from: process.env.TWILIO_FROM_PHONE,
                    body: textMessage.message
                }, function (err, message) {
                    if (!err) {
                        console.log('Success! The SID for this SMS message is:');
                        console.log(message.sid);
                        console.log('Message sent on:');
                        console.log(message.dateCreated);
                    } else {
                        console.log('Oops! There was an error. ', err);
                    }
                });
            }
        });
    }

    sendMessage().then(res.send(true));
});

router.get('/email', function(req, res){
    var emailMessage = {
        sendTo: req.query.sendTo,
        subject: req.query.subject,
        message: req.query.message
    };

    //console.log("email on server: ", emailMessage);

    var sendgrid = require("sendgrid")(process.env.SENDGRID_API_KEY);
    var email = new sendgrid.Email();

    for (var i = 0; i < emailMessage.sendTo.length; i++) {
        console.log("email ", emailMessage.sendTo[i]);
        email.addTo(emailMessage.sendTo[i]);
    }

    email.setFrom(process.env.SENDGRID_FROM_EMAIL);
    email.setSubject(emailMessage.subject);
    email.setHtml(emailMessage.message);

    sendgrid.send(email, function(err, json) {
        if (err) {
            console.log(err);
            res.send(false);
        }
        console.log(json);
        res.send(true);
    });

});

module.exports = router;