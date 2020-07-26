import { Model, DataTypes } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        id_facebook: DataTypes.STRING,
        name_facebook: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default User;
