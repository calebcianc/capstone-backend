const BaseController = require("./BaseController");

class FoldersController extends BaseController {
  constructor(model, recipeModel) {
    super(model);
    this.recipeModel = recipeModel;
  }

  // Get all folders and recipes
  async getFolderRecipe(req, res) {
    try {
      const FolderRecipe = await this.model.findAll({
        include: [
          {
            model: this.recipeModel,
            through: { attributes: [] },
          },
        ],
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
