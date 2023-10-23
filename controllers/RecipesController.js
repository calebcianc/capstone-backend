const BaseController = require("./BaseController");
const generateOpenAiRecipe = require("../openAI");
const InitializeUnsplash = require("../unsplash");

class RecipesController extends BaseController {
  constructor(model, instructionModel, ingredientModel, userModel) {
    super(model);
    this.instructionModel = instructionModel;
    this.ingredientModel = ingredientModel;
    this.userModel = userModel;
  }

  // get all recipe
  async getAllRecipe(req, res) {
    try {
      const recipe = await this.model.findAll({
        include: [
          {
            model: this.userModel,
          },
        ],
      });
      if (!recipe) {
        return res
          .status(404)
          .json({ error: true, msg: "Recipe List not found" });
      }
      return res.json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return res
        .status(500)
        .json({ error: true, msg: "Internal Server Error" });
    }
  }

  // get one recipe
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
          {
            model: this.userModel,
          },
        ],
      });
      if (!recipe) {
        return res.status(404).json({ error: true, msg: "Recipe not found" });
      }
      return res.json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return res
        .status(500)
        .json({ error: true, msg: "Internal Server Error" });
    }
  }

  async createRecipe(req, res) {
    const {
      type,
      input,
      userId,
      isPublic,
      cuisinePreferences,
      userDietaryRestrictions,
    } = req.body;

    let transaction;

    try {
      // call chatgpt api and assign the JSON data to a 'newRecipe' variable
      const newRecipe = await generateOpenAiRecipe({
        type,
        input,
        cuisinePreferences,
        userDietaryRestrictions,
      });

      const parsedNewRecipe = JSON.parse(newRecipe);

      console.log("===> newRecipe", JSON.stringify(parsedNewRecipe));

      if (!newRecipe) {
        throw new Error("Could not fetch recipe");
      }

      // initialise a transaction to ensure that all the data is saved to the database
      transaction = await this.model.sequelize.transaction();

      console.log("===> Create recipe instance");

      // having the JSON data from chatGPT, we can create a new recipe in the recipe model in our db
      const newRecipeInstance = await this.model.create({
        name: parsedNewRecipe.name,
        totalTime: parsedNewRecipe.totalTime,
        servingSize: parsedNewRecipe.servingSize,
        isPublic: isPublic ? isPublic : false,
        cuisine: parsedNewRecipe.cuisine,
        dietaryRestrictions: parsedNewRecipe.dietaryRestrictions,
        userId: userId,
        creatorId: userId,
      });

      console.log(
        "===> newRecipeInstance: ",
        JSON.stringify(newRecipeInstance)
      );

      console.log("===> Get unsplash photo");
      // use unsplash to get photoUrl and insert into recipeImageUrl
      const SearchPhotos = await InitializeUnsplash();
      const photoUrl = await SearchPhotos(parsedNewRecipe.name);
      console.log("photoUrl", photoUrl);
      if (!photoUrl) {
        throw new Error("Could not fetch image");
      }
      await newRecipeInstance.update({ recipeImageUrl: photoUrl });

      console.log(
        "===> newRecipe.ingredients",
        JSON.stringify(parsedNewRecipe.ingredients)
      );
      console.log("===> Create ingredients instances");
      const bulkIngredients = parsedNewRecipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unitOfMeasurement: ingredient.unitOfMeasurement,
        recipeId: newRecipeInstance.id,
      }));

      console.log("===> Bulk create");
      await this.ingredientModel.bulkCreate(bulkIngredients, {
        transaction,
      });

      console.log("===> Create instructions instances");
      const bulkInstructions = parsedNewRecipe.instructions.map(
        (instruction) => ({
          instruction: instruction.instruction,
          step: instruction.step,
          timeInterval: instruction.timeInterval,
          recipeId: newRecipeInstance.id,
        })
      );

      console.log("===> Bulk create");
      await this.instructionModel.bulkCreate(bulkInstructions, {
        transaction,
      });

      await transaction.commit();

      console.log("===> newRecipeInstance", JSON.stringify(newRecipeInstance));
      // console.log("allRecipes", JSON.stringify(allRecipes));
      return res.json(newRecipeInstance);
    } catch (err) {
      await transaction.rollback();

      const isClientError = [
        "Could not fetch recipe",
        "Could not fetch image",
      ].includes(err.message);
      const statusCode = isClientError ? 400 : 500;

      return res.status(statusCode).json({ error: true, msg: err.message });
    }
  }

  // add recipe using manual / type
  async addRecipeToDatabase(req, res) {
    // const { data } = req.body;

    const { recipe, userId } = req.body;
    // const parsedRecipe = JSON.parse(recipe);

    let transaction;

    try {
      // initialise a transaction to ensure that all the data is saved to the database
      transaction = await this.model.sequelize.transaction();

      console.log("===> Create recipe instance");
      const newRecipeInstance = await this.model.create({
        name: recipe.name,
        totalTime: recipe.prepTime,
        isPublic: recipe.isPublic,
        userId: userId,
        creatorId: userId,
      });

      console.log("===> Create ingredients instances");

      const bulkIngredients = recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unitOfMeasurement: ingredient.unitOfMeasurement,
        recipeId: newRecipeInstance.id,
      }));

      console.log("===> Bulk create ingredients");
      await this.ingredientModel.bulkCreate(bulkIngredients, {
        transaction,
      });

      console.log("===> Create instructions instances");
      const bulkInstructions = recipe.instructions.map(
        (instruction, index) => ({
          instruction: instruction.instruction,
          step: index + 1,
          timeInterval: instruction.timeInterval,
          recipeId: newRecipeInstance.id,
        })
      );

      console.log("===> Bulk create instructions");
      await this.instructionModel.bulkCreate(bulkInstructions, {
        transaction,
      });

      await transaction.commit();

      console.log("===> newRecipeInstance", JSON.stringify(newRecipeInstance));

      return res.json(newRecipeInstance);
    } catch (err) {
      await transaction.rollback();

      const isClientError = [
        "Could not fetch recipe",
        "Could not fetch image",
      ].includes(err.message);
      const statusCode = isClientError ? 400 : 500;

      return res.status(statusCode).json({ error: true, msg: err.message });
    }
  }

  // update recipe
  async updateRecipeInDatabase(req, res) {
    const { recipe, userId } = req.body;
    const { recipeId } = req.params;
    let transaction;

    try {
      // initialise a transaction to ensure that all the data is saved to the database
      transaction = await this.model.sequelize.transaction();

      console.log("===> Update recipe instance");
      console.log(
        recipeId,
        recipe.id,
        recipe.name,
        recipe.prepTime,
        recipe.isPublic,
        recipe.cuisineType,
        recipe.dietaryRestrictions
      );
      // Update the recipe fields
      await this.model.update(
        {
          name: recipe.name,
          totalTime: recipe.prepTime,
          isPublic: recipe.isPublic,
          cuisine: recipe.cuisineType,
          dietaryRestrictions: recipe.dietaryRestrictions,
        },
        { where: { id: recipeId }, transaction }
      );

      console.log("===> Update ingredients instances");

      console.log(
        "===> recipe.ingredients[0]:",
        JSON.stringify(recipe.ingredients[0])
      );

      for (const ingredient of recipe.ingredients) {
        await this.ingredientModel.update(
          {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unitOfMeasurement: ingredient.unitOfMeasurement,
          },
          {
            where: { id: ingredient.id },
            transaction,
          }
        );
      }

      console.log("===> Update instructions instances");
      for (const instruction of recipe.instructions) {
        await this.instructionModel.update(
          {
            instruction: instruction.instruction,
            step: instruction.step,
            timeInterval: instruction.timeInterval,
          },
          {
            where: { id: instruction.id },
            transaction,
          }
        );
      }

      // Retrieve the updated recipe instance
      const updatedRecipe = await this.model.findOne({
        where: { id: recipeId },
        transaction,
      });

      await transaction.commit();

      console.log("===> newRecipeInstance", JSON.stringify(updatedRecipe));

      return res.json(updatedRecipe);
    } catch (err) {
      await transaction.rollback();

      const isClientError = [
        "Could not fetch recipe",
        "Could not fetch image",
      ].includes(err.message);
      const statusCode = isClientError ? 400 : 500;

      return res.status(statusCode).json({ error: true, msg: err.message });
    }
  }

  // update recipe photo
  async updatePhoto(req, res) {
    try {
      let photoUrlToAdd = req.body;
      const { recipeId } = req.params;

      const recipeToEdit = await this.model.findOne({
        where: { id: recipeId },
      });
      if (!recipeToEdit) {
        return res.status(404).json({ error: true, msg: "recipe not found" });
      }
      await recipeToEdit.update(photoUrlToAdd);
      return res.json(recipeToEdit);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = RecipesController;
