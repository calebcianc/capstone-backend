"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Gordon Ramsay",
        email: "gordon_ramsay@gmail.com",
        isSubscribed: true,
        cuisinePreferences: "French,Mexican",
        dietaryRestrictions: "Keto,Paleo",
        addedRecipes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "jane.doe@gmail.com",
        isSubscribed: true,
        cuisinePreferences: "Japanese",
        dietaryRestrictions: null,
        addedRecipes: [1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
