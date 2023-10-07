"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("instructions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      instruction: {
        type: Sequelize.STRING,
      },
      step: {
        type: Sequelize.INTEGER,
      },
      timeInterval: {
        type: Sequelize.INTEGER,
      },
      photoUrl: {
        type: Sequelize.STRING,
      },
      receipeId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("instructions");
  },
};
