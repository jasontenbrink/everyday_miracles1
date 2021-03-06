var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var pg = require('pg');

var Promise = require('bluebird');
var bcrypt = require('bcrypt');


var connectionString = process.env.DATABASE_URL   || 'postgres://localhost:5432/everyday_miracles';


//It runs after the local strategy.  Creates session.
passport.serializeUser(function(user, done){

  // user parameter comes from the successful "done" in the bcrypt.compare method
  // in the strategy
  //console.log('Serializer, what is the value of user', user);
  done(null, user.username);//this value (the second one) is passed into the deserializer 'id' parameter
});

// this puts things onto req.user.  Will put things on the req during
// preprocessing/middleware
passport.deserializeUser(function(id, done){
  //console.log('deserialize id is: ', id);

  //a DB call isn't necessary here.  I'm leaving it in in case we want to stick some stuff
  //from the DB onto the req.user.
  /*jshint multistr: true */
  pg.connect(connectionString, function (err, client) {
    client.query("select user_id, first_name, last_name, users.role_id, \
                  date_of_birth, phone_number, email_address, contact_type, \
                  payment_type, everyday_miracles_client_ind, doula_name, \
                  expected_birth_date as due_date, role.name as role from users join \
                  role on users.role_id = role.role_id where user_name = $1", [id],
      function (err, response) {
       client.end();
      if (err) done(err);
      //console.log('deserialize error', err);
      //console.log('deserializer, response', response.rows[0]);
        var username = {};
        username = response.rows[0];

        //at this point we set up what we want to put into the req.user property on future requests(second argument
        // of done).
        //req.user will automatically get added to all requests coming from this client
        //(determined by the cookie the client gives us).  It gets added on by Passport
        //during the middleware part of processing the request.
        done(null, username);
        //username must be an object, that is what passport expects in order to
        //do several things, such as set up isAuthenticated(). I had been passing
        //in a string object and isAuthenticated wasn't showing up
      }
    );
});

});

passport.use('local', new localStrategy({
    passReqToCallback: true,

    //this needs to be whatever property the client is
    //sending the username in as under req.body
    usernameField: 'username'

    }, function(req, username, password, done) {
      //make DB call to get userspassword. on the post body.

    //don't add in 'done' as the third parameter, it will eat the 'done' that
    //the callback strategy needs.

    pg.connect(connectionString, function (err,client) {
      if (err){
        console.log('err on db connect, ', err);
        return err;
      }

      //get hashed password to compare
      client.query("select password, user_id from users where user_name = $1", [req.body.username],
      function (err, response) {
        if (response.rows[0]===undefined){
          return done(null, false, {message:'failed'});
        }
        var dbPassword = response.rows[0].password;
        var user_id = response.rows[0].user_id;
        client.end();

          //compare passwords, bcrypt.compare hashes the first argument using
          //the salt factor that was already set up (set up in register.js for now)
            bcrypt.compare(req.body.password, dbPassword, function(err, isMatch){
                if(err) return err;

                //this var gets sent to SerializeUser and is passed in as the
                //user parameter. I think SerializeUser is what actually makes
                //the session.
                var objectSentToSerializer = {
                  username: req.body.username,
                  randomFunMessage: 'chickenButt',
                  userId: user_id
                };

                if (isMatch){
                  //req.login(objectSentToSerializer, done);
                  return done(null, objectSentToSerializer);
                }
                else{
                  console.log('authentication failed');
                  return done(null, false, {message:'failed'});

                }
            });
      });
    });
}));

module.exports = passport;
