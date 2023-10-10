const BaseController = require("./BaseController");
const generateOpenAiRecipe = require("../openAI");

class RecipesController extends BaseController {
  constructor(model, instructionModel, ingredientModel) {
    super(model);
    this.instructionModel = instructionModel;
    this.ingredientModel = ingredientModel;
  }

  // get one recipe (for testing)
  async getOneRecipe(req, res) {
    try {
      const { recipeId } = req.params;
      const recipe = await this.model.findAll({
        where: { id: recipeId },
        include: [
          {
            model: this.instructionModel,
          },
          {
            model: this.ingredientModel,
          },
        ],
      });
      if (!recipe) {
        return res
          .status(404)
          .json({ error: true, msg: "Itinerary not found" });
      }
      return res.json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return res
        .status(500)
        .json({ error: true, msg: "Internal Server Error" });
    }
  }

  async createRecipePartial(req, res) {
    const { mealType, cuisineType, dietaryRestrictions, servings, prepTime } =
      req.body;

    try {
      // call chatgpt api and assign the array of activities to the activities variable
      const newRecipe = await generateOpenAiRecipe({
        mealType,
        cuisineType,
        dietaryRestrictions,
        servings,
        prepTime,
      });
      if (!newRecipe) {
        return res
          .status(400)
          .json({ error: true, msg: "Could not fetch recipe" });
      }

      /*
      const transaction = await this.model.sequelize.transaction();

      try {
        // having the array of activities from chatGPT, we can create a new itinerary in the itineraries model in our db
        const newItinerary = await this.model.create({
          name: name,
          prompts: prompts,
          isPublic: isPublic,
          maxPax: maxPax,
          genderPreference: genderPreference,
          userId: userId,
          activities: activities, // array of objects from ChatGPT
        });

        // Associate the user with the itinerary and set isCreator to true
        await newItinerary.addUser(userId, {
          through: { isCreator: true },
          transaction,
        });

        const jsArrayActivities = JSON.parse(activities);

        // use unsplash to get photoUrl and insert into itinerary
        const SearchPhotos = await InitializeUnsplash();
        const photoUrl = await SearchPhotos(jsArrayActivities[1].location);
        console.log("photoUrl", photoUrl);
        if (!photoUrl) {
          return res
            .status(400)
            .json({ error: true, msg: "Could not fetch activities" });
        }
        await newItinerary.update({ photoUrl: photoUrl });

        const bulkActivities = jsArrayActivities.map((activity) => ({
          date: activity.date.split("T")[0],
          name: activity.name,
          description: activity.description,
          type: activity.type,
          activityOrder: activity.activity_order,
          timeOfDay: activity.time_of_day,
          suggestedDuration: activity.suggested_duration,
          location: activity.location,
          latitude: activity.latitude,
          longitude: activity.longitude,
          itineraryId: newItinerary.id,
        }));
        await this.activitiesModel.bulkCreate(bulkActivities, {
          transaction,
        });
        await transaction.commit();

        //show remaining itineraries after creation
        let allItinerary = await this.model.findAll({
          include: [
            {
              model: this.activitiesModel,
            },
            {
              model: this.usersModel,
              where: { id: userId },
            },
          ],
        });
        console.log("allItinerary", allItinerary);
        */

      return res.json(newRecipe);
    } catch (dbErr) {
      console.error("Database Error:", dbErr);
      await transaction.rollback();
      return res.status(400).json({ error: true, msg: dbErr.message });
    }
  }
  catch(err) {
    return res.status(400).json({ error: true, msg: err.message });
  }
}

module.exports = RecipesController;
