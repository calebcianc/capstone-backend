"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ingredients", [
      {
        // https://www.kitchenstories.com/en/recipes/traditional-garlic-and-olive-oil-pasta
        // for one serving
        name: "long pasta (e.g.spaghetti or linguine)",
        quantity: 125,
        unitOfMeasurement: "gram",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "olive oil (extra virgin)",
        quantity: 50,
        unitOfMeasurement: "milliliter",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "garlic",
        quantity: 3,
        unitOfMeasurement: "piece",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "parsley",
        quantity: 10,
        unitOfMeasurement: "gram",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Parmesan cheese (grated)",
        quantity: 25,
        unitOfMeasurement: "gram",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "salt",
        quantity: null, // as required
        unitOfMeasurement: null,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "pepper",
        quantity: null, // as required
        unitOfMeasurement: null,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // https://tasty.co/recipe/fajita-parchment-baked-chicken
        name: "parchment paper, or aluminium foil",
        quantity: "12x18 inches",
        unitOfMeasurement: "",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "chicken breast",
        quantity: 1,
        unitOfMeasurement: "",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "red pepper, sliced",
        quantity: "0.5",
        unitOfMeasurement: "",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "yellow pepper",
        quantity: "0.5",
        unitOfMeasurement: "",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "red onion, sliced",
        quantity: "0.5",
        unitOfMeasurement: "",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "salsa",
        quantity: 3,
        unitOfMeasurement: "tablespoons",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "taco seasoning",
        quantity: 1,
        unitOfMeasurement: "teaspoon",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "mexican cheese blend",
        quantity: 1,
        unitOfMeasurement: "tablespoon",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "olive oil",
        quantity: 1,
        unitOfMeasurement: "tablespoon",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "salt, to taste",
        quantity: null,
        unitOfMeasurement: "",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "pepper, to taste",
        quantity: null,
        unitOfMeasurement: "",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ingredients", null, {});
  },
};
