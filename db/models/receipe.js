"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Receipe extends Model {
    static associate(models) {
      this.belongsToMany(models.category, {
        through: "receipe_categories",
      });
      this.belongsTo(models.user);
      this.hasMany(models.ingredient);
      this.hasMany(models.instructions);
    }
  }
  Receipe.init(
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
      folderName: {
        type: DataTypes.STRING,
      },
      lastCookedDate: {
        type: DataTypes.DATE,
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
      modelName: "receipe",
      // underscored: true,
    }
  );
  return Receipe;
};
