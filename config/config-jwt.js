import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { User } from "../service/schemas/user.schemas.js";
import dotenv from "dotenv";
dotenv.config();

function setJWTStrategy() {
  const SECRET = process.env.SECRET_JWT;
  const params = {
    secretOrKey: SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JWTStrategy(params, async function (payload, done) {
      try {
        const user = await User.find({ _id: payload.id }).lean();
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    })
  );
}
export { setJWTStrategy };
