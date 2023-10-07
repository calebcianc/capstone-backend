"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("instructions", [
      {
        // https://www.kitchenstories.com/en/recipes/traditional-garlic-and-olive-oil-pasta
        instruction: "Finely chop parsley. Cut garlic into thin slices.",
        step: 1,
        timeInterval: 3,
        photoUrl:
          "https://images.services.kitchenstories.io/ulsjibr7QK9Ceud44woUc657cCs=/1080x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step01.jpg",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Cook pasta in plenty of salted boiling water, according to package instructions, for approx. 8 – 10 min. until al dente. Drain, save some of the pasta water and set aside.",
        step: 2,
        timeInterval: 13,
        photoUrl:
          "https://images.services.kitchenstories.io/srpDhU66ExZ715py93X9HWcsheM=/1080x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step02.jpg",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Heat up olive oil in a frying pan. Sauté garlic for approx. 1 – 2 min. Pour in pasta water.",
        step: 3,
        timeInterval: 15,
        photoUrl:
          "https://images.services.kitchenstories.io/QAQzELX2SXfP5M3lRCDLUPHT7l0=/1080x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step03.jpg",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Add cooked pasta to the pan and toss in garlic oil. Fold in chopped parsley and season with salt and pepper. Serve sprinkled with freshly grated Parmesan cheese to taste.",
        step: 4,
        timeInterval: 16,
        photoUrl:
          "https://images.services.kitchenstories.io/qmLUvZFRK0lTgyN_3ciu3q7sOeo=/1080x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step04.jpg",
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("instructions", null, {});
  },
};
