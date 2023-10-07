"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("receipe_categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      receipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "receipes",
          key: "id",
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("receipe_categories");
  },
};
