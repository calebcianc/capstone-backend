const BaseController = require("./BaseController");

class InstructionsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // update instruction step photo
  async updatePhoto(req, res) {
    try {
      let photoUrlToAdd = req.body;
      const { recipeId, step } = req.params;

      const recipeToEdit = await this.model.findOne({
        where: { recipeId: recipeId, step: step },
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

module.exports = InstructionsController;
