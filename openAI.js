const dotenv = require("dotenv");
dotenv.config();

const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// function to construct the messages key to send to ChatGPT; with prompts being a prop that is passed from the frontend to the fetchChatCompletion function
const messages = (type, input, cuisinePreferences, userDietaryRestrictions) => {
  let mealType, cuisineType, dietaryRestrictions, servings, prepTime;

  if (typeof input === "object") {
    ({ mealType, cuisineType, dietaryRestrictions, servings, prepTime } =
      input);
  }

  const systemPrompt = `
    You are a world-class chef assisting a user with the following culinary preferences: 
    ${cuisinePreferences} and dietary restrictions: ${userDietaryRestrictions}.
    Use your extensive knowledge of global cuisines to generate a recipe in JSON format. It is imperative that the generated JSON structure is perfect, without any trailing commas or other syntactical errors. 
    
    The expected format for your response is as follows:

{
    "name": "RECIPE_NAME",
    "totalTime": TIME_IN_MINUTES,
    "servingSize": SIZE_IN_PAX,
    "cuisine": "CUISINE_TYPE",
    "dietaryRestrictions": "DIETARY_RESTRICTIONS",
    "ingredients": [
        {
            "name": "INGREDIENT_NAME",
            "quantity": QUANTITY,
            "unitOfMeasurement": "UNIT"
        },
        ...
    ],
    "instructions": [
        {
            "step": STEP_NUMBER,
            "instruction": "INSTRUCTION_TEXT",
            "timeInterval": TIME_IN_MINUTES
        },
        ...
    ]
}

For instance:

{
    "name": "Spaghetti Aglio e Olio",
    "totalTime": 15,
    "cuisine": "Italian",
    "dietaryRestrictions": "Vegetarian",
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
        }
        ...
    ],
    "instructions": [
        {
            "step": 1,
            "instruction": "Boil salted water in a large pot. Cook the spaghetti until al dente.",
            "timeInterval": 10
        },
        {
            "step": 2,
            "instruction": "In a large skillet, heat olive oil over medium. Sauté garlic and red pepper flakes for 1-2 minutes until garlic is golden.",
            "timeInterval": 2
        }
        ...
    ]
}

Ensure the generated JSON data strictly follows the format above.`;

  const generateRecipePrompt =
    type === "surprise"
      ? `Generate a random popular recipe in the JSON format indicated in the system prompt taking into account user's culinary preferences and dietary restrictions.`
      : type === "suggest"
      ? `Generate a recipe based on the following parameters: ${cuisineType} cuisine for ${mealType} that has ${dietaryRestrictions} dietary restrictions, for ${servings} pax, that can be prepared in ${prepTime}, in the JSON format indicated in the system prompt.`
      : type === "paste"
      ? `Convert the following text into a recipe in the JSON format indicated in the system prompt: ${input}`
      : "";

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
  type,
  input,
  cuisinePreferences,
  userDietaryRestrictions,
}) {
  console.log("generateOpenAiRecipe function is running");
  console.log(
    "Prompts: ",
    JSON.stringify({
      type,
      input,
      cuisinePreferences,
      userDietaryRestrictions,
    })
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
        type,
        input,
        cuisinePreferences,
        userDietaryRestrictions
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
