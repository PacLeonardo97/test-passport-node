import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import createLocaleMiddleware from "express-locale";
import { routes } from "./routes";
import "./database";
import { initialiseAuthentication } from "./auth";
import cookieParser from "cookie-parser";
import passport from "passport";

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  createLocaleMiddleware({
    priority: ["accept-language", "default"],
    default: "pt-br",
  })
);

app.use(passport.initialize());

app.use(routes);

initialiseAuthentication(app);

app.listen(port, () => console.log(`funcionando na porta ${port}`));
