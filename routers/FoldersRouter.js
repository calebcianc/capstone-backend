class FoldersRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }

  routes() {
    const router = this.express.Router();
    router.get(
      "/:email",
      this.controller.getUserFolderRecipes.bind(this.controller)
    );
    return router;
  }
}

module.exports = FoldersRouter;
