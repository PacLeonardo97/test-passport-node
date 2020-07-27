import express from "express";
import User from "./controller/user/userController";
import Facebook from './controller/Facebook/FacebookController';

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ hello: "You are on the passport test site" });
});

routes.get('/facebook', Facebook.index);
routes.get('/facebook/:id', Facebook.show);

routes.get("/user", User.index);
routes.get("/user/:id", User.show);


export { routes };
