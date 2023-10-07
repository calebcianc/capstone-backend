"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("receipes", [
      {
        // https://www.kitchenstories.com/en/recipes/traditional-garlic-and-olive-oil-pasta
        totalTime: 15,
        name: "Spaghetti aglio e olio",
        folderName: null,
        lastCookedDate: null,
        userId: 1,
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("receipes", null, {});
  },
};
