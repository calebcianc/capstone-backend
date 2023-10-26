"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cookbook extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsToMany(models.recipe, {
        through: {
          model: "recipe_cookbooks",
          unique: false,
          foreignKey: "cookbook_id",
          otherKey: "recipe_id",
        },
      });
    }
  }
  Cookbook.init(
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
      userId: {
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
      modelName: "cookbook",
      underscored: true,
    }
  );
  return Cookbook;
};
