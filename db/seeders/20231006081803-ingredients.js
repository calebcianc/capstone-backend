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
        receipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "olive oil (extra virgin)",
        quantity: 50,
        unitOfMeasurement: "milliliter",
        receipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "garlic",
        quantity: 3,
        unitOfMeasurement: "piece",
        receipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "parsley",
        quantity: 10,
        unitOfMeasurement: "gram",
        receipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Parmesan cheese (grated)",
        quantity: 25,
        unitOfMeasurement: "gram",
        receipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "salt",
        quantity: null, // as required
        unitOfMeasurement: null,
        receipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "pepper",
        quantity: null, // as required
        unitOfMeasurement: null,
        receipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ingredients", null, {});
  },
};
