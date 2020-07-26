import UserRepositories from "../../repositories/UserRepositories";
import passport from "passport";

class User {
  async index(req, res) {
    const user = await UserRepositories.getAll();
    if (user.length === 0) {
      res.status(200).json({ message: "no content" });
    }
    res.status(201).json({ content: user });
  }
  async show(req, res) {
    const userId = await UserRepositories.findByPrimaryKey(req.param("id"));
    if (userId) {
      res.status(201).json({ content: userId });
    }
    res.status(200).json({ message: "no content" });
  }
}

export default new User();
