const dotenv = require("dotenv");
dotenv.config();

const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// function to construct the messages key to send to ChatGPT; with prompts being a prop that is passed from the frontend to the fetchChatCompletion function
const messages = (
  mealType,
  cuisineType,
  dietaryRestrictions,
  servings,
  prepTime
) => {
  const userInterests = ["Asian", "Spicy", "Soup-based"];
  const systemPrompt = `
    You are a world class chef to a user with the following culinary preferences: 
    ${userInterests.join(", ")}. 
    Use your immense knowledge base of every cuisine in the world to generate a recipe in JSON format.
    ...

You will respond STRICTLY in the following format:
{
        "title": " ",
        "servings": ,
        "ingredients": [
            {
                "item": " ",
                "quantity": ,
                "unit": " "
            }
        ],
        "instructions": [
            {
                "Step": 1,
                "Description": " ",
                "Duration in minutes": 10
            },
            {
                "Step": 2,
                "Description": " ",
                "Duration in minutes": 2
            }
        ]
    }
Here is an example:
{
        "title": "Spaghetti Aglio e Olio",
        "servings": 4,
        "ingredients": [
            {
                "item": "Spaghetti",
                "quantity": 400,
                "unit": "grams"
            },
            {
                "item": "Extra virgin olive oil",
                "quantity": 0.25,
                "unit": "cup"
            },
            {
                "item": "Garlic",
                "quantity": 6,
                "unit": "cloves",
                "preparation": "thinly sliced"
            },
            {
                "item": "Red pepper flakes",
                "quantity": 0.5,
                "unit": "teaspoon"
            },
            {
                "item": "Fresh parsley",
                "quantity": 0.25,
                "unit": "cup",
                "preparation": "chopped"
            },
            {
                "item": "Salt",
                "quantity": "to taste",
                "unit": ""
            },
            {
                "item": "Black pepper",
                "quantity": "to taste",
                "unit": ""
            }
        ],
        "instructions": [
            {
                "Step": 1,
                "Description": "Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente.",
                "Duration in minutes": 10
            },
            {
                "Step": 2,
                "Description": "Meanwhile, in a large skillet, heat the olive oil over medium heat. Add the garlic and red pepper flakes, and sauté for about 1-2 minutes, until the garlic is golden but not browned.",
                "Duration in minutes": 2
            },
            {
                "Step": 3,
                "Description": "Reserve about 1 cup of the pasta cooking water, then drain the spaghetti.",
                "Duration in minutes": 2
            },
            {
                "Step": 4,
                "Description": "Add the spaghetti to the skillet with the garlic oil, and toss well to coat, adding a bit of the reserved pasta water if needed to loosen things up.",
                "Duration in minutes": 5
            },
            {
                "Step": 5,
                "Description": "Season with salt and black pepper to taste, and toss with fresh parsley.",
                "Duration in minutes": 2
            },
            {
                "Step": 6,
                "Description": "Serve immediately, garnished with additional parsley if desired.",
                "Duration in minutes": 2
            }
        ]
    }`;
  const generateRecipePrompt =
    cuisineType === ""
      ? `Generate a popular random recipe in the JSON format indicated in the system prompt.`
      : `Generate a recipe based on the following parameters: ${cuisineType} cusine for ${mealType} that has ${dietaryRestrictions} dietary restrictions, for ${servings} pax, that can be prepared in ${prepTime}, in the JSON format indicated in the system prompt.`;

  return [
    {
      role: "system",
      content: `${systemPrompt}`,
    },
    {
      role: "user",
      content: `${generateRecipePrompt}`,
    },
  ];
};

async function generateOpenAiRecipe({
  mealType,
  cuisineType,
  dietaryRestrictions,
  servings,
  prepTime,
}) {
  console.log("generateOpenAiRecipe function is running");
  console.log(
    "Prompts: ",
    JSON.stringify(
      mealType,
      cuisineType,
      dietaryRestrictions,
      servings,
      prepTime
    )
  );

  let counter = 0; // Initialize counter
  // Start the count-up timer
  timerId = setInterval(() => {
    counter++;
    console.log(`Time elapsed: ${counter} seconds`);
  }, 1000);

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages(
        mealType,
        cuisineType,
        dietaryRestrictions,
        servings,
        prepTime
      ),
    });

    clearInterval(timerId); // Stop the timer

    const storeGPTResponse = chatCompletion.choices[0].message.content;
    console.log("storeGPTResponse: ", storeGPTResponse);
    return storeGPTResponse;
  } catch (error) {
    clearInterval(timerId); // Stop the timer
    console.error("Error", error);
  }
}

module.exports = generateOpenAiRecipe;
