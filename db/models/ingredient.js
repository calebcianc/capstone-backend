"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      this.belongsTo(models.receipe);
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
        type: DataTypes.INTEGER,
      },
      unitOfMeasurement: {
        type: DataTypes.STRING,
      },
      receipeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "receipe",
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
