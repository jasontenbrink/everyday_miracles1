var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/:name?', function (req, res) {
  var name = req.params.name;
  console.log('on the jade route. ', name);

  if (name === 'nav.jade'){
    res.render('templates/' + name, {user: req.user});
  }
  else{
    //console.log("req.user: ", req.user);
    res.render('routes/' + name, {user: req.user});
  }
});



module.exports = router;
