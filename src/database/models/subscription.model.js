const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Subscription extends Model {}

Subscription.init(
  {
    subscriptionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },

    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    enddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Subscription;
