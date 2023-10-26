"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Gordon Ramsay",
        email: "gordon_ramsay@gmail.com",
        isSubscribed: true,
        profilePictureUrl: null,
        cusinePreferences: "french,mexican",
        dietaryRestrictions: "keto,paleo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "jane.doe@gmail.com",
        isSubscribed: true,
        profilePictureUrl: null,
        cusinePreferences: "japanese",
        dietaryRestrictions: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
