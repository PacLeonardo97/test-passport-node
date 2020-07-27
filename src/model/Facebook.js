import { Model, DataTypes } from "sequelize";

class Facebook extends Model {
  static init(sequelize) {
    super.init(
      {
        id_facebook: DataTypes.INTEGER,
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
  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'id', as: 'user' });;
  }
}

export default Facebook;
