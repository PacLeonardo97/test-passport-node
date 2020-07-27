import passport from "passport";
import passportFacebook from "passport-facebook";

import UserRepositories from "../../repositories/UserRepositories";
import FacebookRepositories from "../../repositories/FacebookRepositories";

import FacebookModel from "../../model/Facebook";

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
    try {
      const getFacebookById = await FacebookRepositories.findByPrimaryKey(
        profile.id
      );

      if (!getFacebookById) {
        const user = await UserRepositories.register({
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        const facebook = await FacebookRepositories.register({
          user_id: user.dataValues.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          id_facebook: profile.id,
        });
        return done(null, { ...user.dataValues, accessToken });
      }
      const userId = await UserRepositories.findByPrimaryKey(
        getFacebookById.dataValues.user_id
      );
      if (userId) {
        return done(null, { ...userId.dataValues, accessToken });
      }
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
      if (err) {
        res.status(400).json({ message: err.message });
      }
    }
  );
  return app;
};
export { strategy };
