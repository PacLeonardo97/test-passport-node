import { Model, DataTypes } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasOne(models.Facebook, { foreignKey: "user_id", as: "facebook",  });
  }
}

export default User;
