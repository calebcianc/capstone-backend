"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cookbooks", [
      {
        name: "Personally created",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Added from Explore",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Personally created",
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Added from Explore",
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cookbooks", null, {});
  },
};
