import passport from "passport";
import bcrypt from "bcrypt";
import UserRepositories from "../repositories/UserRepositories";

const setup = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserRepositories.findOne(id);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
};

const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password was not provided");
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate, actual) => {
  return await bcrypt.compare(candidate, actual);
};

export { setup, hashPassword, verifyPassword };
