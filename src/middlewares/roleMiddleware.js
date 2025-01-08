const roleMiddleware = (allowedRoles) => (req, res, next) => {
  // console.log(req);
  
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = roleMiddleware;
