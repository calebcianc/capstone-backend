"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      this.belongsTo(models.recipe);
    }
  }
  Ingredient.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.STRING,
      },
      unitOfMeasurement: {
        type: DataTypes.STRING,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "recipe",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "ingredient",
      // underscored: true,
    }
  );
  return Ingredient;
};
