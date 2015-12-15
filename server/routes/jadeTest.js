var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/:name', function (req, res) {
  var name = req.params.name;
  console.log('on the jade route. ', name);
  //res.send('hi');
  res.render('routes/' + name, {message: 'Hello there!'});
});

module.exports = router;
