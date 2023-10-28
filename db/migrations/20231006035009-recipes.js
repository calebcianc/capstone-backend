"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      total_time: {
        type: Sequelize.INTEGER,
      },
      serving_size: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      last_cooked_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_public: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      cuisine: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dietary_restrictions: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recipe_image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      creator_id: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("recipes");
  },
};
