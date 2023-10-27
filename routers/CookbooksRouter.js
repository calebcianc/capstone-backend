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

    router.get(
      "/:userId",
      this.controller.getUserCookbooks.bind(this.controller)
    );

    router.get(
      "/recipes/:userId",
      this.controller.getRecipeCookbooks.bind(this.controller)
    );

    router.put(
      "/:userId/:recipeId",
      this.controller.addToCookbook.bind(this.controller)
    );

    return router;
  }
}

module.exports = CookbooksRouter;
