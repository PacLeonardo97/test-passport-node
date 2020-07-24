import UserRepositories from "../../repositories/UserRepositories";

class User {
  async index(req, res) {
    const user = await UserRepositories.getAll();
    if (user.length === 0) {
      res.status(200).json({ message: "no content" });
    }
  }
  async store(req, res) {}
  async select(req, res) {}
  async destroy(req, res) {}
}

export default new User();
