"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      roomId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PlaceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Places",
          key: "placeId",
        },
        // onDelete: "CASCADE",
        //  배포시 다시 열어줘야함
      },
      pictures: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      roomName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      option: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
    await queryInterface.addColumn("Rooms", "placeId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Places",
        key: "placeId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};
