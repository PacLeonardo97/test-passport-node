import Model from "../model/Facebook";

const getAll = () => Model.findAll();

const findByPrimaryKey = (id) => Model.findByPk(id);

const register = async (payload) => {
  const { name, email, id_facebook, user_id } = payload;

  const user = new Model();

  user.name = name;
  user.user_id = user_id
  user.email = email;
  user.id_facebook = id_facebook;

  await user.save();
  return user;
};


export default { getAll, findByPrimaryKey, register };
