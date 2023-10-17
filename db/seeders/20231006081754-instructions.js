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
      {
        // https://tasty.co/recipe/fajita-parchment-baked-chicken
        instruction: "Preheat oven to 400°F (200°C).",
        step: 1,
        timeInterval: null,
        photoUrl: null,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction: "Fold the parchment paper in half, then open up.",
        step: 2,
        timeInterval: null,
        photoUrl: null,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Thinly slice the peppers and onion and lay them on one half of the parchment paper.",
        step: 3,
        timeInterval: null,
        photoUrl: null,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction: "Drizzle on oil and sprinkle on salt & pepper.",
        step: 4,
        timeInterval: null,
        photoUrl: null,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Lay the chicken on the peppers. Season with taco seasoning, salt and pepper, and spoon on salsa. Top with cheese.",
        step: 5,
        timeInterval: null,
        photoUrl: null,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Fold the parchment paper over the chicken, and cinch the paper together by folding it over itself along the edges.",
        step: 6,
        timeInterval: null,
        photoUrl: null,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Bake for 25-30 minutes or until internal temperature of chicken reaches 165˚F (75˚C).",
        step: 7,
        timeInterval: 25,
        photoUrl: null,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction: "fajita parchment baked chicken is ready!",
        step: 8,
        timeInterval: 25,
        photoUrl:
          "https://img.buzzfeed.com/buzzfeed-static/static/2023-04/19/15/asset/82c19baee9c9/sub-buzz-1261-1681919507-9.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("instructions", null, {});
  },
};
