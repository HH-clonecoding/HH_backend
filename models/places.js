"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Places extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Likes, {
        sourceKey: "placeId",
        foreignKey: "PlaceId",
      });
      this.hasMany(models.Comments, {
        sourceKey: "placeId",
        foreignKey: "PlaceId",
      });
      this.hasMany(models.Re_comments, {
        sourceKey: "placeId",
        foreignKey: "PlaceId",
      });
      this.hasMany(models.Rooms, {
        sourceKey: "placeId",
        foreignKey: "PlaceId",
      });
    }
  }
  Places.init(
    {
      placeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pictures: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalRoom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      system: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Places",
    }
  );
  return Places;
};
