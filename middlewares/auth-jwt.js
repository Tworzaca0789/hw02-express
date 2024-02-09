import passport from "passport";

export default function auth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    req.user = user;
    return next();
  })(req, res, next);
}
