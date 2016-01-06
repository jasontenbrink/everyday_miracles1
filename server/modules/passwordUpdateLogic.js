function determineUser(req, res, next){
  req.targetUser;
  if (req.user.role !== 'admin'){
    req.targetUser = req.user;
    //need to check current password against one in DB right here.
  }
  else if (req.user.role === 'admin'){
    req.targetUser = req.body;
  }
 next();
}

module.exports = determineUser;
