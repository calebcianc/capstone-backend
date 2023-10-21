"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("folders", [
      {
        name: "Guilty Pleasure",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Faves",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("folders", null, {});
  },
};
