class InstructionsRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }

  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));
    router.put(
      "/saveImageUrl/:recipeId/:step",
      this.controller.updatePhoto.bind(this.controller)
    );
    return router;
  }
}

module.exports = InstructionsRouter;
