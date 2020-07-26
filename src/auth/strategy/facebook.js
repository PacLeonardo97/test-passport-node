import passport from "passport";
import passportFacebook from "passport-facebook";

import UserRepositories from "../../repositories/UserRepositories";
import UserModel from "../../model/User";
import { signToken } from "../utils";

const FacebookStrategy = passportFacebook.Strategy;

const strategy = (app) => {
  const strategyOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.FACEBOOK_APP_CALLBACKURL}`,
    scope: ["user_friends", "manage_pages"],
    profileFields: ["id", "displayName", "email"],
    enableProof: true,
  };

  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    const getUserById = await UserRepositories.findIdFacebook(profile.id);
    if (getUserById) {
      return done(null, { ...getUserById.dataValues, accessToken });
    }

    try {
      const user = await UserRepositories.register({
        name: profile.displayName,
        id_facebook: profile.id,
        name_facebook: profile.displayName,
        email: profile.emails[0].value,
      });
      return done(null, { ...user.dataValues, accessToken });
    } catch (error) {
      return done(error, null);
    }
  };

  passport.use(new FacebookStrategy(strategyOptions, verifyCallback));

  app.get(
    `/auth/facebook`,
    passport.authenticate("facebook", { scope: ["email"] })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      return res.status(200).json(req.user);
    },
    (err, req, res, next) => {
      console.log("error callback", err);
      if (err) {
        res.status(400).json({ message: err.message });
      }
    }
  );
  return app;
};
export { strategy };
