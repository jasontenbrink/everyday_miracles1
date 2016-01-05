var express = require("express");
var router = express.Router();

router.get('/text', function(req, res){
    var textMessage = {
        phoneNumber: req.query.phoneNumber,
        message: req.query.message
    };

    console.log(textMessage);
    // Your accountSid and authToken from twilio.com/user/account
    var accountSid = 'ACa9b539731d1b87ec42fc2ae3cfe723e9';
    var authToken = "b84fc0b15d8b8477a95743277dec586b";
    var client = require('twilio')(accountSid, authToken);

    //var phoneNumber = ["+16129783936", "+16518906678"];

    for (i=0; i<phoneNumber.length; i++) {

        client.messages.create({
            body: textMessage.message,
            to: phoneNumber[i],
            from: "+17639511796"
        }, function (err, message) {
            if (err) {
                console.log("Error, ", err);
            }
            console.log(message.sid);
            process.stdout.write(message.sid);
        });
    }

});

module.exports = router;