"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      totalTime: {
        type: Sequelize.INTEGER,
      },
      lastCookedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      cuisine: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dietaryRestrictions: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recipeImageUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("recipes");
  },
};
