"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Re_comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Comments, {
        targetKey: "commentId",
        foreignKey: "CommentId",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Places, {
        targetKey: "placeId",
        foreignKey: "PlaceId",
        onDelete: "CASCADE",
      });
    }
  }
  Re_comments.init(
    {
      recomId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      PlaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CommentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
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
      modelName: "Re_comments",
    }
  );
  return Re_comments;
};
