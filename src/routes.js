import express from "express";

const routes = express.Router();

import { passportFacebookLogin } from "./middleware/passportFacebook";

routes.get("/", (req, res) =>
  res.json({ hello: "You are on the passport test site" })
);

routes.get("/auth/facebook/callback", passportFacebookLogin);

export { routes };
