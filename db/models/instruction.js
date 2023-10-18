"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Instruction extends Model {
    static associate(models) {
      this.belongsTo(models.recipe);
    }
  }
  Instruction.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      instruction: {
        type: DataTypes.TEXT,
      },
      step: {
        type: DataTypes.INTEGER,
      },
      timeInterval: {
        type: DataTypes.INTEGER,
      },
      photoUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: "instruction",
      // underscored: true,
    }
  );
  return Instruction;
};
