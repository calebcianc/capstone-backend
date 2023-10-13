"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recipes", [
      {
        // https://www.kitchenstories.com/en/recipes/traditional-garlic-and-olive-oil-pasta
        totalTime: 15,
        name: "Spaghetti aglio e olio",
        lastCookedDate: null,
        isPublic: true,
        recipeImageUrl:
          "https://firebasestorage.googleapis.com/v0/b/cheftalk-404a2.appspot.com/o/UserData%2FGordon%20Ramsay%2Frecipe%2F1%2FrecipeImage%2Folive-oil-pasta_Final_4x3.jpg?alt=media",
        userId: 1,
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipes", null, {});
  },
};
