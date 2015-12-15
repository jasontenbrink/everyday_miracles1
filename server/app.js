//github test by john

var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('./strategies/localStrategy.js');
var session = require('express-session');
var twilio = require('twilio');

var index = require('./routes/index.js');
var jadeTest = require('./routes/jadeTest.js');
var users = require('./routes/users');
var event = require('./routes/event');
var eventSchedule = require('./routes/eventSchedule');
var usersEventSchedule = require('./routes/usersEventSchedule');
var login = require('./routes/login.js');

app.set('views', path.join(__dirname,'./public/assets/views/'));
app.set('view options', {layout: false});
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Passport Session Configuration
app.use(session({
   secret: 'secret',
   key: 'user', //req.session
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 600000, secure: false}
}));

//this has to go before the passport session gets initialized, otherwise
//static files will disappear once a session ends (breaks on login > logout > login)
app.use(express.static (path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/templates/', jadeTest);

//login stuff
app.use('/login', login);

//data routes
app.use('/users', users);
app.use('/event', event);
app.use('/eventSchedule', eventSchedule);
app.use('/usersEventSchedule', usersEventSchedule);
app.use('/', index);


//I think the below 3 lines set a view as a relative path everytime
//res.render is used.



//app.get('*', index);


app.set("port", process.env.PORT || 5000);


app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});


module.exports = app;
