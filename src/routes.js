import express from "express";
import User from "./controller/user/userController";

const routes = express.Router();

import { passportFacebookLogin } from "./middleware/passportFacebook";

routes.get("/", (req, res) =>
  res.json({ hello: "You are on the passport test site" })
);

routes.get("/auth/facebook/callback", passportFacebookLogin);
routes.get("/olamundo", User.index);

export { routes };
