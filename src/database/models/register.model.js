const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Register extends Model {}

Register.init(
  {
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
    },
    firstname: {
      type: DataTypes.STRING(255),
    },
    lastname: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
    },
    walletaddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize }
);

module.exports = Register;
