import express from "express";
import User from "./controller/user/userController";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ hello: "You are on the passport test site" });
});

routes.get("/user", User.index);
routes.get("/user/:id", User.show);

export { routes };
