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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk-404a2.appspot.com/o/UserData%2F1%2Frecipe%2F1%2FrecipeImage%2Folive-oil-pasta_Final_4x3.jpeg?alt=media&token=3fed701b-3309-4f5b-ae16-61062b785fba",
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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk-404a2.appspot.com/o/UserData%2F1%2Frecipe%2F1%2FinstructionImage%2F4%2Fstep4.jpeg?alt=media&token=951b2ff6-a060-49d3-b79d-2950aacbec87",
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
