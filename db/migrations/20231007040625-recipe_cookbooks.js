"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recipe_cookbooks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      recipe_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "recipes",
          key: "id",
        },
        allowNull: false, // Ensure that recipeId cannot be null
        onDelete: "CASCADE", // Optionally, cascade delete entries when a recipe is deleted
      },
      cookbook_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "cookbooks",
          key: "id",
        },
        allowNull: false, // Ensure that cookbookId cannot be null
        onDelete: "CASCADE", // Optionally, cascade delete entries when a cookbook is deleted
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("recipe_cookbooks");
  },
};
