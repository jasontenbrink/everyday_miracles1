function requireAuth(req, res, next){

  // check if the user is logged in
  if(req.isAuthenticated()){

    next();
  }
  else{

    //req.session.messages = "You need to login to view this page";
    res.send(401);
  
    //res.send('fail');
    //res.redirect('/templates/login.jade');//this redirect isn't working
      //these redirects don't work with AJAX, but they will work with native
      //html posts, gets etc (like in forms).  Can just redirect on client side.

  }
}

module.exports = requireAuth;
