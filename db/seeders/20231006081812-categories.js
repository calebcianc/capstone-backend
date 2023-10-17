"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "PIZZA & PASTA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Western",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Japanese",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
