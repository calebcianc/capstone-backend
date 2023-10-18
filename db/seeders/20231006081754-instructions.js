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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk2-1cb43.appspot.com/o/UserData%2F1%2Frecipe%2F1%2FinstructionImage%2F1%2Fstep1.jpeg?alt=media",
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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk2-1cb43.appspot.com/o/UserData%2F1%2Frecipe%2F1%2FinstructionImage%2F2%2Fstep2.jpeg?alt=media",
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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk2-1cb43.appspot.com/o/UserData%2F1%2Frecipe%2F1%2FinstructionImage%2F3%2Fstep3.jpeg?alt=media",
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
          "https://firebasestorage.googleapis.com/v0/b/cheftalk2-1cb43.appspot.com/o/UserData%2F1%2Frecipe%2F1%2FinstructionImage%2F4%2Fstep4.jpeg?alt=media",
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

      {
        //https://www.kitchenstories.com/en/recipes/eggplant-unagi-japanese-style-glazed-eggplant
        instruction:
          "Peel the eggplants and cut off the ends. Bring water to a boil in a steamer (alternatively, in a wok with a bamboo steamer insert or simply in a pot with a steam rack and a lid). Steam the eggplants over medium heat for approx. 16–18 min., until a knife slides easily through the eggplants.",
        step: 1,
        timeInterval: 16,
        photoUrl:
          "https://images.services.kitchenstories.io/wQPisdwWF2yyvlC0OXaD5E12B-Q=/750x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R3009-step-photo-1.jpg",
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Mix soy sauce, mirin, water, teriyaki sauce and sugar in a small bowl. Cut scallion into fine rings. After steaming, let the eggplants cool a bit and cut them in half lengthwise. Using a fork, open each piece several times like a book to create a larger surface for the sauce later.",
        step: 2,
        timeInterval: null,
        photoUrl:
          "https://images.services.kitchenstories.io/ko0PWXRPcac3FyxH_7mSBWXO-vI=/750x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R3009-step-photo-2.jpg",
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Heat oil in a non-stick fry pan on high. Fry the eggplants on both sides until golden brown. If necessary, add 1 more tbsp of oil",
        step: 3,
        timeInterval: null,
        photoUrl:
          "https://images.services.kitchenstories.io/0LR4auwVvFMKFvCWZu1JMc7IZAc=/750x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R3009-step-photo-3.jpg",
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Pour the sauce mixture over the eggplants in the pan and simmer until reduced enough to make the eggplants sticky and glossy. Arrange on a bed of steamed rice and serve with sesame seeds and scallions.",
        step: 4,
        timeInterval: null,
        photoUrl:
          "https://images.services.kitchenstories.io/bT4NuG9JI5LHU8IzgoMg69SxFnY=/750x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R3009-step-photo-5.jpg",
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //https://www.kitchenstories.com/en/recipes/creamy-kohlrabi-with-nutmeg
        instruction:
          "Peel the kohlrabi, remove any woody parts and cut into strips. Reserve some of the fresh leaves and finely chop them for garnish later. Finely chop onion.",
        step: 1,
        timeInterval: null,
        photoUrl:
          "https://images.services.kitchenstories.io/AHkRi9q6qB7GHuUyBNg0w0P39Go=/750x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R2961-step-photo-.jpg",
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "In a frying pan, melt butter. Add onion and fry until translucent. Then add kohlrabi strips, fry for approx 2–3 min. Season with salt, pepper and freshly ground nutmeg to taste.",
        step: 2,
        timeInterval: 2,
        photoUrl:
          "https://images.services.kitchenstories.io/V7GbyLXgKGqzhLEYTKg2JB85210=/750x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R2961-step-photo-_1.jpg",
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Deglaze with vegetable broth and let cook for approx. 15 min. covered, over medium heat until the kohlrabi is soft and the sauce is reduced. Remove from heat, stir in crème fraîche and season with salt again. Finish with lemon juice and garnish with chopped kohlrabi greens and some lemon zest if desired.",
        step: 3,
        timeInterval: 15,
        photoUrl:
          "https://images.services.kitchenstories.io/EmYqLss5oC9A9DQSJEd0RA7O2_g=/750x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R2961-step-photo-_2.jpg",
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // https://www.kitchenstories.com/en/recipes/traditional-garlic-and-olive-oil-pasta
        instruction: "Finely chop parsley. Cut garlic into thin slices.",
        step: 1,
        timeInterval: 3,
        photoUrl:
          "https://images.services.kitchenstories.io/d_uvenuXIKu1Kh6sNMBaC2GKyA8=/384x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step01.jpg",
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Cook pasta in plenty of salted boiling water, according to package instructions, for approx. 8 – 10 min. until al dente. Drain, save some of the pasta water and set aside.",
        step: 2,
        timeInterval: 13,
        photoUrl:
          "https://images.services.kitchenstories.io/iiZZA9XfLG7iMNMjzoQj2cRJSpA=/384x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step02.jpg",
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Heat up olive oil in a frying pan. Sauté garlic for approx. 1 – 2 min. Pour in pasta water.",
        step: 3,
        timeInterval: 15,
        photoUrl:
          "https://images.services.kitchenstories.io/FDykg8pI60EI6TvK71YerLO6lYE=/384x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step03.jpg",
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction:
          "Add cooked pasta to the pan and toss in garlic oil. Fold in chopped parsley and season with salt and pepper. Serve sprinkled with freshly grated Parmesan cheese to taste.",
        step: 4,
        timeInterval: 16,
        photoUrl:
          "https://images.services.kitchenstories.io/hVuRDwiLNQo0Xq-93IyilpBNyI4=/384x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step04.jpg",
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("instructions", null, {});
  },
};
