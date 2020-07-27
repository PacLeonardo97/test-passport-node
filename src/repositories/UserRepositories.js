import Model from "../model/User";

const getAll = () => Model.findAll();

const findByPrimaryKey = (id) => Model.findByPk(id);

const register = async (payload) => {
  const { name, email, password, id_facebook, name_facebook } = payload;
  const user = new Model();

  user.name = name;
  user.email = email;
  user.password = password;
  user.name_facebook = name_facebook;
  await user.save();

  return user;
};

const remove = (id) => Model.destroy({ where: { id } });

export default { getAll, findByPrimaryKey, register, remove };
