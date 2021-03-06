var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var pg  = require('pg');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var SALT_WORK_FACTOR = 10;

var connectionString = process.env.DATABASE_URL   || 'postgres://localhost:5432/everyday_miracles';

// router.get('/', function (req, res, next){
//     res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
// });


/*jshint multistr: true */
router.post('/', function(req,res,next){
  var user = req.body;
  var roleId = 1;
  if (req.body.roleId !== undefined){
    roleId = req.body.roleId;
  }
//  if(!user.isModified('password')) return next;


    bcrypt.genSaltAsync(SALT_WORK_FACTOR).then(function(salt){
      //  if(err) return next(err);
        return bcrypt.hashAsync(user.password, salt);
      })
      .then(function(hash){
         req.body.password = hash;
            //next();

            pg.connect(connectionString, function (err, client, done) {
              if (err) console.log(err);
              client.query("INSERT INTO users (user_name, \
                  password, \
                  first_name, \
                  last_name, \
                  role_id, \
                  date_of_birth, \
                  phone_number, \
                  email_address, \
                  contact_type, \
                  payment_type, \
                  everyday_miracles_client_ind, \
                  doula_name, \
                  expected_birth_date) \
              VALUES \
              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) \
              RETURNING user_id;",
                  [req.body.username,
                  req.body.password,
                  req.body.firstName,
                  req.body.lastName,
                  roleId,
                  req.body.dateOfBirth,
                  req.body.phoneNumber,
                  req.body.emailAddress,
                  req.body.contactType,
                  req.body.paymentType,
                  req.body.everydayMiraclesClientInd,
                  req.body.doulaName,
                  req.body.expectedBirthDate],


                  function (err, response) {
                    client.end();
                    if (err) console.log(err);
                  //res.json(1);
                    res.json({"userId":response.rows[0].user_id});
                  });
                  //res.redirect('/');  //this redirect should probably go away
                  // probably just send a 200 status or something
            });
      });
});

module.exports = router;
