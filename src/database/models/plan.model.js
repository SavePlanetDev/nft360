const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Plan extends Model {}

Plan.init(
  {
    planId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },

    description: {
      type: DataTypes.TEXT,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
  },
  { sequelize }
);

module.exports = Plan;
