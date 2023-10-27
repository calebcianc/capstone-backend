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

  // Get all cookbooks and recipes for a user
  // async getUserCookbookRecipes(req, res) {
  //   const { email } = req.params;

  //   try {
  //     // get user id
  //     const userId = await this.userModel.findAll({
  //       attributes: ["id"],
  //       where: {
  //         email: email,
  //       },
  //     });

  //     // get user cookbook recipe
  //     const CookbookRecipe = await this.model.findAll({
  //       include: [
  //         {
  //           model: this.recipeModel,
  //           through: { attributes: [] },
  //           include: [
  //             {
  //               model: this.userModel,
  //             },
  //           ],
  //         },
  //       ],
  //       where: {
  //         userId: userId[0].id,
  //       },
  //     });

  //     if (!CookbookRecipe) {
  //       return res.status(404).json({ error: true, msg: "Cookbook not found" });
  //     }
  //     return res.json(CookbookRecipe);
  //   } catch (error) {
  //     console.error("Error fetching cookbook recipes:", error);
  //     return res
  //       .status(500)
  //       .json({ error: true, msg: "Internal Server Error" });
  //   }
  // }

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

  // async getRecipeCookbooks(req, res) {
  //   try {
  //     const userId = req.params.userId;
  //     const recipeCookbooks = await this.sequelize.query(
  //       "SELECT * FROM cookbooks WHERE id IN (SELECT cookbook_id FROM recipe_cookbooks WHERE recipe_id = ?)",
  //       {
  //         replacements: [userId],
  //         type: this.sequelize.QueryTypes.SELECT,
  //       }
  //     );
  //     res.json(recipeCookbooks);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Server Error");
  //   }
  // }

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

      res.json({ message: "Successfully added to cookbook" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = CookbooksController;
