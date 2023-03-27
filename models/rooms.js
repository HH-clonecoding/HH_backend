"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Places, {
        targetKey: "placeId",
        foreignKey: "PlaceId",
        // onDelete: "CASCADE",
        //  배포시 다시 열어줘야함
      });
    }
  }
  Rooms.init(
    {
      roomId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      PlaceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pictures: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      roomName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      option: {
        allowNull: false,
        type: DataTypes.STRING,
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
      modelName: "Rooms",
    }
  );
  return Rooms;
};
