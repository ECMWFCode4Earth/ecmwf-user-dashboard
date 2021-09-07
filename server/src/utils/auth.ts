import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import User from "../models/User";


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env["SECRET_KEY"],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.sub }).exec(); // `sub` property on the JWT payload corresponds to database ID of user
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});


passport.use(strategy);
