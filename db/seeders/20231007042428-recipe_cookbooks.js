"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recipe_cookbooks", [
      {
        recipeId: 1,
        cookbookId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 2,
        cookbookId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 3,
        cookbookId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 4,
        cookbookId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 5,
        cookbookId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipe_cookbooks", null, {});
  },
};
