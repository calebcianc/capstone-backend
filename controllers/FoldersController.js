const BaseController = require("./BaseController");

class FoldersController extends BaseController {
  constructor(model, recipeModel, userModel) {
    super(model);
    this.recipeModel = recipeModel;
    this.userModel = userModel;
  }

  // Get all folders and recipes for a user
  async getUserFolderRecipes(req, res) {
    const { email } = req.params;

    try {
      // get user id
      const userId = await this.userModel.findAll({
        attributes: ["id"],
        where: {
          email: email,
        },
      });

      // get user folder recipe
      const FolderRecipe = await this.model.findAll({
        include: [
          {
            model: this.recipeModel,
            through: { attributes: [] },
            include: [
              {
                model: this.userModel,
              },
            ],
          },
        ],
        where: {
          userId: userId[0].id,
        },
      });

      if (!FolderRecipe) {
        return res.status(404).json({ error: true, msg: "Folder not found" });
      }
      return res.json(FolderRecipe);
    } catch (error) {
      console.error("Error fetching folder recipes:", error);
      return res
        .status(500)
        .json({ error: true, msg: "Internal Server Error" });
    }
  }
}

module.exports = FoldersController;
