const authenticatedOnly = (req, res, next) => {
  if(req.user && req.user.mail){
    return next();
  }
  res.status(401).redirect('/login/');
};

const adminOnly = (req, res, next) => {
  authenticatedOnly(req, res, () => {
    if(req.user.isAdmin){
      return next();
    }
    res.status(403).redirect('/');
  });
};

module.exports = {
  authenticatedOnly,
  adminOnly,
};
