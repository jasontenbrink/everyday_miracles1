var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/:name', function (req, res) {
  var name = req.params.name;
  console.log('on the secured Templates route. ', name);

  if (name === 'nav.jade'){
    res.render('templates/' + name, {message: 'Hello there!'});
  }
  else{
    res.render('routes/' + name, {message: 'Hello there!'});
  }
});



module.exports = router;
