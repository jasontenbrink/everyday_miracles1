var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pg  = require('pg');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var userLogic = require('../modules/passwordUpdateLogic.js');
var SALT_WORK_FACTOR = 10;

/*jshint multistr: true */

var connectionString = process.env.DATABASE_URL   || 'postgres://localhost:5432/everyday_miracles';

// router.get('/', function (req, res, next){
//     res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
// });

router.put('/', userLogic, function(req,res,next){
  console.log('req.targetUser', req.targetUser);

  //target user gets attached to the req in the userLogic middleware
  var user1 = {};
  user1 = {password: req.targetUser.params.password,
              username: req.targetUser.params.userName,
              userId: req.targetUser.params.userId
            };
  console.log('user1', user1);

    bcrypt.genSaltAsync(SALT_WORK_FACTOR).then(function(salt){
      //  if(err) return next(err);
        console.log('value of salt, before hash', salt);
        console.log('value of pwd before hash', user1.password);
        return bcrypt.hashAsync(user1.password, salt);
      })
      .then(function(hash){
         user1.password = hash;
            console.log('pwd from inside bcrypt after hash', user1.password);
            //next();
            pg.connect(connectionString, function (err, client, done) {
              if (err) console.log(err);
              console.log('pwd from just before DB write', user1);
              client.query("UPDATE users \
                            SET password = $1 \
                            WHERE user_id = $2;",
                  [user1.password, user1.userId],
                  function (err, res) {
                    if (err) console.log(err);

                  });
                  res.redirect('/');  //this redirect should probably go away
                  // probably just send a 200 status or something
            });
      });
});

module.exports = router;
