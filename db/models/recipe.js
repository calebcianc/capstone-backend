"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    static associate(models) {
      this.belongsToMany(models.cookbook, {
        through: {
          model: "recipe_cookbooks",
          unique: false,
          foreignKey: "recipe_id",
          otherKey: "cookbook_id",
        },
      });
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
      name: {
        type: DataTypes.STRING,
      },
      totalTime: {
        type: DataTypes.STRING,
      },
      servingSize: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastCookedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      cuisine: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dietaryRestrictions: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recipeImageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      underscored: true,
    }
  );
  return recipe;
};
