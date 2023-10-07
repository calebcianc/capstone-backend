"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("receipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      totalTime: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      folderName: {
        type: Sequelize.STRING,
      },
      lastCookedDate: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      creatorId: {
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
    await queryInterface.dropTable("receipes");
  },
};
