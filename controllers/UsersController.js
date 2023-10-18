const BaseController = require("./BaseController");
const axios = require("axios");
require("dotenv").config();

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // get user fist time login in status
  async getFirstTimeLoginStatus(req, res) {
    const { email } = req.params;

    try {
      const firstTimeLoginStatus = await this.model.findOne({
        where: { email: email },
      });

      let message = false;
      if (firstTimeLoginStatus === null) message = true;
      return res.json(message);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // create user with form information
  async addUser(req, res) {
    const { name, email, cusinePreferences, dietaryRestrictions } = req.body;

    try {
      const contract = await this.model.create({
        name: name,
        email: email,
        cusinePreferences: cusinePreferences,
        dietaryRestrictions: dietaryRestrictions,
      });

      return res.json("success");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
