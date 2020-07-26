import UserModel from "../model/User";

const getAll = () => UserModel.findAll();

const findByPrimaryKey = (id) => UserModel.findByPk(id);

const findIdFacebook = async (id) =>
  UserModel.findOne({ where: { id_facebook: id } });

const register = async (payload) => {
  const { name, email, password, id_facebook, name_facebook } = payload;
  const user = new UserModel();

  user.name = name;
  user.email = email;
  user.password = password;
  user.id_facebook = id_facebook;
  user.name_facebook = name_facebook;
  await user.save();

  return user;
};

const remove = (id) => UserModel.destroy({ where: { id } });

export default { getAll, findByPrimaryKey, findIdFacebook, register, remove };
