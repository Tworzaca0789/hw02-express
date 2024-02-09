import passport from "passport";
import passportJwt, { Strategy } from "passport-jwt";
import { User } from "../service/schemas/user.schemas.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET_JWT;
passport.use(
  new passportJwt.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken,
    },
    (payload, done) => {
      User.findOne({ _id: payload.id })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(new Error("Token is invalid"));
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
export { Strategy };
