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
        "name": " ",
        "totalTime": ,
        "ingredients": [
            {
                "name": " ",
                "quantity": ,
                "unitOfMeasurement": " "
            }
        ],
        "instructions": [
            {
                "step": 1,
                "instruction": " ",
                "timeInterval": 10
            },
            {
                "step": 2,
                "instruction": " ",
                "timeInterval": 2
            }
        ]
    }
Here is an example:
{
        "name": "Spaghetti Aglio e Olio",
        "totalTime": 15,
        "ingredients": [
            {
                "name": "Spaghetti",
                "quantity": 400,
                "unitOfMeasurement": "grams"
            },
            {
                "name": "Extra virgin olive oil",
                "quantity": 0.25,
                "unitOfMeasurement": "cup"
            },
            {
                "name": "Garlic",
                "quantity": 6,
                "unitOfMeasurement": "cloves",
            },
            {
                "name": "Red pepper flakes",
                "quantity": 0.5,
                "unitOfMeasurement": "teaspoon"
            },
            {
                "name": "Fresh parsley",
                "quantity": 0.25,
                "unitOfMeasurement": "cup",                
            },
            {
                "name": "Salt",
                "quantity": "to taste",
                "unitOfMeasurement": ""
            },
            {
                "name": "Black pepper",
                "quantity": "to taste",
                "unitOfMeasurement": ""
            }
        ],
        "instructions": [
            {
                "step": 1,
                "instruction": "Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente.",
                "timeInterval": 10
            },
            {
                "step": 2,
                "instruction": "Meanwhile, in a large skillet, heat the olive oil over medium heat. Add the garlic and red pepper flakes, and sauté for about 1-2 minutes, until the garlic is golden but not browned.",
                "timeInterval": 2
            },
            {
                "step": 3,
                "instruction": "Reserve about 1 cup of the pasta cooking water, then drain the spaghetti.",
                "timeInterval": 2
            },
            {
                "step": 4,
                "instruction": "Add the spaghetti to the skillet with the garlic oil, and toss well to coat, adding a bit of the reserved pasta water if needed to loosen things up.",
                "timeInterval": 5
            },
            {
                "step": 5,
                "instruction": "Season with salt and black pepper to taste, and toss with fresh parsley.",
                "timeInterval": 2
            },
            {
                "step": 6,
                "instruction": "Serve immediately, garnished with additional parsley if desired.",
                "timeInterval": 2
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
