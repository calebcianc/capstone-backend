"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recipe_cookbooks", [
      {
        recipe_id: 1,
        cookbook_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipe_id: 2,
        cookbook_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipe_id: 3,
        cookbook_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipe_id: 4,
        cookbook_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        recipe_id: 5,
        cookbook_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipe_cookbooks", null, {});
  },
};
