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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk-404a2.appspot.com/o/UserData%2FGordon%20Ramsay%2Frecipe%2F1%2FinstructionImage%2F1%2F08_09_TraditionalGarlicAndOliveOilPasta_step01.jpg?alt=media",
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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk-404a2.appspot.com/o/UserData%2FGordon%20Ramsay%2Frecipe%2F1%2FinstructionImage%2F2%2F08_09_TraditionalGarlicAndOliveOilPasta_step02.jpg?alt=media",
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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk-404a2.appspot.com/o/UserData%2FGordon%20Ramsay%2Frecipe%2F1%2FinstructionImage%2F3%2F08_09_TraditionalGarlicAndOliveOilPasta_step03.jpg?alt=media",
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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk-404a2.appspot.com/o/UserData%2FGordon%20Ramsay%2Frecipe%2F1%2FinstructionImage%2F4%2F08_09_TraditionalGarlicAndOliveOilPasta_step04.jpg?alt=media",
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
