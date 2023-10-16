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
      {
        // https://tasty.co/recipe/fajita-parchment-baked-chicken
        totalTime: 195,
        name: "Fajita Parchment-Baked Chicken",
        lastCookedDate: null,
        isPublic: true,
        recipeImageUrl:
          "https://img.buzzfeed.com/buzzfeed-static/static/2023-04/19/15/asset/82c19baee9c9/sub-buzz-1261-1681919507-9.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
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
