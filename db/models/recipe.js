"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    static associate(models) {
      this.belongsToMany(models.category, {
        through: "recipe_categories",
      });
      this.belongsToMany(models.folder, { through: "recipe_folders" });
      this.belongsTo(models.user);
      this.hasMany(models.ingredient);
      this.hasMany(models.instruction);
    }
  }
  recipe.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      totalTime: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      lastCookedDate: {
        type: DataTypes.DATE,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
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
      modelName: "recipe",
      // underscored: true,
    }
  );
  return recipe;
};
