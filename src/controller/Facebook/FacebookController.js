import FacebookModel from "../../model/Facebook";
import FacebookRepositories from '../../repositories/FacebookRepositories'

class Facebook {
  async index(req, res) {
    try {
      const facebook = await FacebookRepositories.getAll();
      
      if (facebook.length === 0) {
        res.json({ message: "no content" });
      }
      res.json({ content: facebook });
    } catch (error) {
      res.json({ message: error });
    }
  }
  async show(req, res) {
    const userId = await FacebookRepositories.findByPrimaryKey(req.param("id"));
    if (userId) {
      res.status(201).json({ content: userId });
    }
    res.status(200).json({ message: "no content" });
  }
}

export default new Facebook();
