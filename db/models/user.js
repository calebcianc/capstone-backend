"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.recipe);
      this.hasMany(models.recipe);
      this.hasMany(models.folder);
    }
  }
  User.init(
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
      email: {
        type: DataTypes.STRING,
      },
      isSubscribed: {
        type: DataTypes.BOOLEAN,
      },
      profilePictureUrl: {
        type: DataTypes.STRING,
      },
      cusinePreferences: {
        type: DataTypes.STRING,
      },
      dietaryRestrictions: {
        type: DataTypes.STRING,
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
      modelName: "user",
      // underscored: true,
    }
  );
  return User;
};
