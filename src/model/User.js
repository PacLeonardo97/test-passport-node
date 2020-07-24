import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        id_facebook: Sequelize.STRING,
        name_facebook: Sequelize.STRING,
        id_gmail: Sequelize.STRING,
        name_gmail: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default User;
