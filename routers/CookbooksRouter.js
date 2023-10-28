class CookbooksRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }

  routes() {
    const router = this.express.Router();
    // router.get(
    //   "/:email",
    //   this.controller.getUserCookbookRecipes.bind(this.controller)
    // );

    // get list of user's cookbooks
    router.get(
      "/:userId",
      this.controller.getUserCookbooks.bind(this.controller)
    );

    // get list of user's cookbook and recieps in each cookbook
    router.get(
      "/recipes/:userId",
      this.controller.getRecipeCookbooks.bind(this.controller)
    );

    // get list of cookbooks that a recipe is in
    router.get(
      "/byRecipe/:recipeId/:userId",
      this.controller.getCookbooksByRecipeId.bind(this.controller)
    );

    // add a recipe to cookbooks
    router.put(
      "/:userId/:recipeId",
      this.controller.addToCookbook.bind(this.controller)
    );

    // update recipe cookbook table
    router.post(
      "/updateRecipeCookbooks/:recipeId",
      this.controller.updateRecipeCookbooks.bind(this.controller)
    );

    return router;
  }
}

module.exports = CookbooksRouter;
