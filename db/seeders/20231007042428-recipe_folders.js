"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recipe_folders", [
      {
        recipeId: 1,
        folderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 2,
        folderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 3,
        folderId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 2,
        folderId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipe_folders", null, {});
  },
};
