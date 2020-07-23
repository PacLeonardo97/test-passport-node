import passport from "passport";

export const passportFacebookLogin = passport.authenticate(
  "facebook",
  (err, user, info) => {
    try {
      console.log("deu certo", user, info);

      if (err) {
        console.log("error passportFacebookLogin", err);
        throw new Error("ops, error");
      }
      //Database save here with sequelize

    } catch (error) {
      console.log("errinho", error);
    }
  }
);

export const fbCallBack = (accessToken, refreshToken, profile, cb) => {
  console.log('fbCallBack', accessToken, refreshToken, profile);
};

export const facebookOptions = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_APP_CALLBACKURL,
};
