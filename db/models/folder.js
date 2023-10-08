"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsToMany(models.recipe, { through: "recipe_folders" });
    }
  }
  Folder.init(
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
      modelName: "folder",
      // underscored: true,
    }
  );
  return Folder;
};
