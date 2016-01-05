var express = require("express");
var router = express.Router();

router.get('/text', function(req, res){
    var textMessage = {
        phoneNumber: req.query.phoneNumber,
        message: req.query.message
    };

    console.log(textMessage);
    // Your accountSid and authToken from twilio.com/user/account
    var twilio = require('twilio');
    var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


    //var phoneNumber = ["+16129783936", "+16518906678"];

    for (var i=0; i<phoneNumber.length; i++) {

        client.sms.messages.create({
            to: textMessage.phoneNumber[i],
            from: "+17639511796",
            body: textMessage.message
        }, function (err, message) {
            if (!err) {
                console.log('Success! The SID for this SMS message is:');
                console.log(message.sid);
                console.log('Message sent on:');
                console.log(message.dateCreated);
            } else {
                console.log('Oops! There was an error.');
            }
        });
    }

    res.send(true);

});

module.exports = router;