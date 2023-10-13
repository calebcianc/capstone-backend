class RecipesRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }

  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAllRecipe.bind(this.controller));
    router.get(
      "/:recipeId",
      this.controller.getOneRecipe.bind(this.controller)
    );
    router.post(
      "/partialsurprise",
      this.controller.createRecipePartial.bind(this.controller)
    );

    return router;
  }
}

module.exports = RecipesRouter;
