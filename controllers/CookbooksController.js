const BaseController = require("./BaseController");

class CookbooksController extends BaseController {
  constructor(model, recipeModel, userModel) {
    super(model);
    this.recipeModel = recipeModel;
    this.userModel = userModel;
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

  async addToCookbook(req, res) {
    try {
      const { userId, recipeId } = req.params;
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = CookbooksController;
