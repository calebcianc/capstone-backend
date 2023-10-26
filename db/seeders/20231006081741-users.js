"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Gordon Ramsay",
        email: "gordon_ramsay@gmail.com",
        is_subscribed: true,
        cuisine_preferences: "French,Mexican",
        dietary_restrictions: "Keto,Paleo",
        added_recipes: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jane Doe",
        email: "jane.doe@gmail.com",
        is_subscribed: true,
        cuisine_preferences: "Japanese",
        dietary_restrictions: null,
        added_recipes: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
