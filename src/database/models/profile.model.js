const { Model, DataTypes, ARRAY } = require("sequelize");
const sequelize = require("../database");

class Profile extends Model {}

Profile.init(
  {
    userId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true,
    },
    nftOwned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    collectionOwned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    totalValue: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },

    pl24hr: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },

    pl7d: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },

    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favorite: {
      type: ARRAY(DataTypes.STRING(255)),
      allowNull: true,
    },
  },
  { sequelize }
);

module.exports = Profile;
