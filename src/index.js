import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { routes } from "./routes";

import {
  facebookOptions,
  fbCallBack,
} from "./middleware/passportFacebook";

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(routes);

app.use(
  session({
    secret: process.env.FACEBOOK_APP_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

passport.use(new FacebookStrategy(facebookOptions, fbCallBack));

app.listen(port, () => console.log("funcionando na porta 8080"));
