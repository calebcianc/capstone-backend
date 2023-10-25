class UsersController {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }

  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));

    router.get(
      "/first-login/:email",
      this.controller.getFirstTimeLoginStatus.bind(this.controller)
    );

    router.get(
      "/profile/:email",
      this.controller.getUserProfile.bind(this.controller)
    );

    router.post("/", this.controller.addUser.bind(this.controller));
    return router;
  }
}

module.exports = UsersController;
