"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recipes", [
      {
        name: "Spaghetti aglio e olio",
        totalTime: 15,
        servingSize: 1,
        lastCookedDate: null,
        isPublic: true,
        recipeImageUrl:
          "https://firebasestorage.googleapis.com/v0/b/cheftalk2-1cb43.appspot.com/o/UserData%2F1%2Frecipe%2F1%2FrecipeImage%2Folive-oil-pasta_Final_4x3.jpeg?alt=media",
        userId: 1,
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cuisine: "Italian",
        dietaryRestrictions: "None",
      },
      {
        name: "Fajita Parchment-Baked Chicken",
        totalTime: 195,
        servingSize: 1,
        lastCookedDate: null,
        isPublic: true,
        recipeImageUrl:
          "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/fd6ce4f4938d43b5b0dcba34bb7b8ecd/BFV14814_Parchment-BakedChicken4Ways_FB.jpg?resize=600:*&output-format=auto&output-quality=auto",
        userId: 1,
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cuisine: "Mexican",
        dietaryRestrictions: "None",
      },
      {
        name: "Eggplant Unagi",
        totalTime: 30,
        servingSize: 1,
        lastCookedDate: null,
        isPublic: true,
        recipeImageUrl:
          "https://images.services.kitchenstories.io/CjkCo1bqoE58zmHgU9gxzFAyQYA=/1080x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R3009-final-photo-3.jpg",
        userId: 2,
        creatorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        cuisine: "Japanese",
        dietaryRestrictions: "Vegan",
      },
      {
        name: "Creamy kohlrabi with nutmegcream",
        totalTime: 30,
        servingSize: 1,
        lastCookedDate: null,
        isPublic: false,
        recipeImageUrl:
          "https://images.services.kitchenstories.io/QBPLS1fW-VLhTUB2_ZOWjVf-k3E=/1080x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R2961-final-photo_new.jpg",
        userId: 1,
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cuisine: "French",
        dietaryRestrictions: "Vegetarian",
      },
      {
        name: "Spaghetti aglio e olio",
        totalTime: 15,
        servingSize: 1,
        lastCookedDate: null,
        isPublic: false,
        recipeImageUrl:
          "https://images.services.kitchenstories.io/z3_w8O4CHELKXOsptEkU1XowhBk=/1080x0/filters:quality(85)/images.kitchenstories.io/recipeImages/olive-oil-pasta_Final_4x3.jpg",
        userId: 2,
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cuisine: "Italian",
        dietaryRestrictions: "None",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipes", null, {});
  },
};
