"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recipe_categories", [
      {
        recipeId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 2,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 3,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recipeId: 4,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipe_categories", null, {});
  },
};
