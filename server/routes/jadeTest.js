var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/:name?', function (req, res) {
  var name = req.params.name;
  console.log('on the jade route. ', name);

  if (name === 'nav.jade'){
    res.render('templates/' + name, {message: 'Hello there!'});
  }
  else{
    res.render('routes/' + name, {message: 'hi there'});
  }
});



module.exports = router;
