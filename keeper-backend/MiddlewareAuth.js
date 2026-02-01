import passport from "passport";

const authenticate = (req, res, next) => { passport.authenticate('jwt', { session: false}, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Authentication error' });
    }
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
    
    req.user = user;
    next();
  })(req, res, next);
};

export default authenticate;    