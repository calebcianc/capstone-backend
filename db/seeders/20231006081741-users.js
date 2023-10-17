"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Gordon Ramsay",
        email: "GordonRamsay@gmail.com",
        isSubscribed: true,
        cusinePreferences: "french,mexican",
        dietaryRestrictions: "keto,paleo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "jane.doe@gmail.com",
        isSubscribed: true,
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
