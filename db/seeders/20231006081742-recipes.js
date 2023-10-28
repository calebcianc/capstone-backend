"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("recipes", [
      {
        name: "Spaghetti aglio e olio",
        total_time: 15,
        serving_size: 1,
        last_cooked_date: null,
        is_public: true,
        recipe_image_url:
          "https://firebasestorage.googleapis.com/v0/b/cheftalk2-1cb43.appspot.com/o/UserData%2F1%2Frecipe%2F1%2FrecipeImage%2Folive-oil-pasta_Final_4x3.jpeg?alt=media",
        user_id: 1,
        creator_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        cuisine: "Italian",
        dietary_restrictions: "None",
      },
      {
        name: "Fajita Parchment-Baked Chicken",
        total_time: 195,
        serving_size: 1,
        last_cooked_date: null,
        is_public: true,
        recipe_image_url:
          "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/fd6ce4f4938d43b5b0dcba34bb7b8ecd/BFV14814_Parchment-BakedChicken4Ways_FB.jpg?resize=600:*&output-format=auto&output-quality=auto",
        user_id: 1,
        creator_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        cuisine: "Mexican",
        dietary_restrictions: "None",
      },
      {
        name: "Eggplant Unagi",
        total_time: 30,
        serving_size: 1,
        last_cooked_date: null,
        is_public: true,
        recipe_image_url:
          "https://images.services.kitchenstories.io/CjkCo1bqoE58zmHgU9gxzFAyQYA=/1080x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R3009-final-photo-3.jpg",
        user_id: 2,
        creator_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        cuisine: "Japanese",
        dietary_restrictions: "Vegan",
      },
      {
        name: "Creamy kohlrabi with nutmegcream",
        total_time: 30,
        serving_size: 1,
        last_cooked_date: null,
        is_public: false,
        recipe_image_url:
          "https://images.services.kitchenstories.io/QBPLS1fW-VLhTUB2_ZOWjVf-k3E=/1080x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R2961-final-photo_new.jpg",
        user_id: 1,
        creator_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        cuisine: "French",
        dietary_restrictions: "Vegetarian",
      },
      {
        name: "Spaghetti aglio e olio",
        total_time: 15,
        serving_size: 1,
        last_cooked_date: null,
        is_public: false,
        recipe_image_url:
          "https://images.services.kitchenstories.io/z3_w8O4CHELKXOsptEkU1XowhBk=/1080x0/filters:quality(85)/images.kitchenstories.io/recipeImages/olive-oil-pasta_Final_4x3.jpg",
        user_id: 2,
        creator_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        cuisine: "Italian",
        dietary_restrictions: "None",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipes", null, {});
  },
};
