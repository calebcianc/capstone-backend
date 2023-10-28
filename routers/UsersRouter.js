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
    router.put(
      "/profile/photo",
      this.controller.updateUserPicture.bind(this.controller)
    );
    router.put(
      "/profile/cusine-preferences",
      this.controller.updateCusinePreferences.bind(this.controller)
    );
    router.put(
      "/profile/dietary-restrictions",
      this.controller.updateDietiaryRestrictions.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersController;
