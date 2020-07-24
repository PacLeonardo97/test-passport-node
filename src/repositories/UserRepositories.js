import UserModal from "../model/User";

const getAll = async () => await UserModal.findAll();

const findOne = async id => await UserModal.findByPk(id);

const register = async payload => {
  const { name, email, password } = payload;

  const user = new UserModal();

  user = {
    name,
    email,
    password,
  };

  await user.save();

  return user;
};

const remove = async id => {
  await UserModal.destroy({ where: { id } });
};

export default { getAll, findOne, register, remove };
