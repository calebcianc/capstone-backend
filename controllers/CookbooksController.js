const BaseController = require("./BaseController");

class CookbooksController extends BaseController {
  constructor(
    model,
    recipeModel,
    userModel,
    ingredientModel,
    instructionModel
  ) {
    super(model);
    this.recipeModel = recipeModel;
    this.userModel = userModel;
    this.ingredientModel = ingredientModel;
    this.instructionModel = instructionModel;
    this.sequelize = model.sequelize;
  }

  async getUserCookbooks(req, res) {
    try {
      const userId = req.params.userId;
      const userCookbooks = await this.model.findAll({
        where: { user_id: userId },
      });
      res.json(userCookbooks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }

  async getRecipeCookbooks(req, res) {
    try {
      const userId = req.params.userId;

      // First, get the user's cookbooks
      const userCookbooks = await this.model.findAll({
        where: { user_id: userId },
      });

      // Extract cookbook IDs from the user's cookbooks
      const cookbookIds = userCookbooks.map((cookbook) => cookbook.id);
      console.log("cookbookIds", cookbookIds);

      // Format the cookbookIds array into a string list for the IN clause
      const cookbookIdsList = cookbookIds.join(",");
      console.log("cookbookIdsList", cookbookIdsList);

      // Now get the recipes associated with these cookbooks
      const recipeCookbooks = await this.sequelize.query(
        `SELECT * FROM recipe_cookbooks WHERE cookbook_id IN (${cookbookIdsList})`,
        {
          type: this.sequelize.QueryTypes.SELECT,
        }
      );
      console.log("recipeCookbooks", recipeCookbooks);

      // Organize the recipes by cookbook ID
      const organizedRecipes = recipeCookbooks.reduce((acc, recipeCookbook) => {
        const cookbookId = recipeCookbook.cookbook_id;
        const recipeId = recipeCookbook.recipe_id;

        // Initialize an object for this cookbookId if it doesn't already exist
        acc[cookbookId] = acc[cookbookId] || [];

        // Add the recipeId to this cookbook's array
        acc[cookbookId].push(recipeId);

        return acc;
      }, {});

      console.log("organizedRecipes", organizedRecipes);

      res.json(organizedRecipes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }

  async getCookbooksByRecipeId(req, res) {
    try {
      const recipeId = req.params.recipeId; // Assuming recipeId is passed as a URL parameter
      const userId = req.params.userId; // Assuming userId is passed as a URL parameter

      // Query to fetch cookbook_ids associated with the given userId from the cookbooks table
      const userCookbooks = await this.sequelize.query(
        `SELECT * FROM cookbooks WHERE user_id = :userId`,
        {
          replacements: { userId },
          type: this.sequelize.QueryTypes.SELECT,
        }
      );

      // Extract unique cookbook IDs associated with the user from the query result
      const userCookbookIds = [...new Set(userCookbooks.map((uc) => uc.id))];
      console.log("userCookbookIds", userCookbookIds);

      // Query to fetch cookbook_ids associated with the given recipeId from the recipe_cookbooks table
      const cookbookRecipes = await this.sequelize.query(
        `SELECT * FROM recipe_cookbooks WHERE recipe_id = :recipeId`,
        {
          replacements: { recipeId },
          type: this.sequelize.QueryTypes.SELECT,
        }
      );

      console.log("cookbookRecipes", cookbookRecipes);

      // Extract unique cookbook IDs from the query result
      let cookbookIds = [
        ...new Set(cookbookRecipes.map((cr) => cr.cookbook_id)),
      ];
      console.log("cookbookIds", cookbookIds);

      // Filter out cookbook IDs that are not associated with the given user
      cookbookIds = cookbookIds.filter((id) => userCookbookIds.includes(id));
      console.log("Filtered cookbookIds", cookbookIds);

      res.json(cookbookIds); // Respond with the filtered array of cookbook id's
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }

  async addToCookbook(req, res) {
    try {
      const { userId, recipeId } = req.params;
      const { checkedCookbooks } = req.body;

      // Fetch the user and extract addedRecipes
      const user = await this.userModel.findOne({ where: { id: userId } });
      const currentAddedRecipes = user.addedRecipes;

      // Parse the existing addedRecipes to check if recipeId is already inside
      const existingRecipesMap = currentAddedRecipes
        ? currentAddedRecipes.split(",").reduce((map, pair) => {
            const [origId, dupId] = pair.split("-");
            map[origId] = dupId;
            return map;
          }, {})
        : {};

      let duplicateRecipeId;
      if (existingRecipesMap[recipeId]) {
        // Recipe is already duplicated, use the existing duplicate recipe id
        duplicateRecipeId = existingRecipesMap[recipeId];
      } else {
        // Recipe is not duplicated yet, duplicate the recipe
        const originalRecipe = await this.recipeModel.findOne({
          where: { id: recipeId },
        });
        const duplicateRecipe = await this.recipeModel.create({
          ...originalRecipe.dataValues,
          id: null, // Let Sequelize generate a new id
          userId,
        });
        duplicateRecipeId = duplicateRecipe.id;

        // Duplicate ingredients
        const originalIngredients = await this.ingredientModel.findAll({
          where: { recipeId },
        });
        for (const ingredient of originalIngredients) {
          await this.ingredientModel.create({
            ...ingredient.dataValues,
            id: null, // Let Sequelize generate a new id
            recipeId: duplicateRecipeId,
          });
        }

        // Duplicate instructions
        const originalInstructions = await this.instructionModel.findAll({
          where: { recipeId },
        });
        for (const instruction of originalInstructions) {
          await this.instructionModel.create({
            ...instruction.dataValues,
            id: null, // Let Sequelize generate a new id
            recipeId: duplicateRecipeId,
          });
        }

        // Update addedRecipes column
        const newAddedRecipes = currentAddedRecipes
          ? `${currentAddedRecipes},${recipeId}-${duplicateRecipeId}`
          : `${recipeId}-${duplicateRecipeId}`;
        await user.update({ addedRecipes: newAddedRecipes });
      }

      for (const cookbook of checkedCookbooks) {
        let cookbookId = cookbook.id;
        // Create new cookbook if cookbookId is null
        if (cookbookId === null) {
          const newCookbook = await this.model.create({
            name: cookbook.name,
            userId,
          });
          cookbookId = newCookbook.id;
        }

        // Create or update recipe_cookbooks instance
        await this.sequelize.query(
          "INSERT INTO recipe_cookbooks (recipe_id, cookbook_id, created_at, updated_at) VALUES (?, ?, ?, ?)",
          {
            replacements: [
              duplicateRecipeId,
              cookbookId,
              new Date(),
              new Date(),
            ],
          }
        );
      }

      res.json({
        message: "Successfully added to cookbook",
        duplicateRecipeId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }

  async updateRecipeCookbooks(req, res) {
    try {
      const { recipeId } = req.params;
      const { checkedCookbooks } = req.body;

      for (const cookbook of checkedCookbooks) {
        // check if entry already exists
        const [existingEntry] = await this.sequelize.query(
          `SELECT * FROM recipe_cookbooks WHERE recipe_id = :recipeId AND cookbook_id = :cookbookId`,
          {
            replacements: { recipeId, cookbookId: cookbook.id },
            type: this.sequelize.QueryTypes.SELECT,
          }
        );

        if (existingEntry && cookbook.checked === false) {
          // If there is an existing entry and the 'checked' value is false, destroy the instance
          await this.sequelize.query(
            `DELETE FROM recipe_cookbooks WHERE recipe_id = :recipeId AND cookbook_id = :cookbookId`,
            {
              replacements: { recipeId, cookbookId: cookbook.id },
              type: this.sequelize.QueryTypes.DELETE,
            }
          );
        } else if (!existingEntry && cookbook.checked === true) {
          // If there is no existing entry and the 'checked' value is true, create an instance
          await this.sequelize.query(
            "INSERT INTO recipe_cookbooks (recipe_id, cookbook_id, created_at, updated_at) VALUES (?, ?, ?, ?)",
            {
              replacements: [recipeId, cookbook.id, new Date(), new Date()],
              type: this.sequelize.QueryTypes.INSERT,
            }
          );
        }
        // In other cases do nothing as specified
      }
      // Send success message
      res.json({
        status: 200,
        message: "Successfully updated the cookbooks",
      });
    } catch (error) {
      // Handle error
      console.error(error);
      res.json({
        status: 500,
        error: "Server Error",
      });
    }
  }
}

module.exports = CookbooksController;
