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
        attributes: ["id"],
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
    const { name, email, cuisinePreferences, dietaryRestrictions } = req.body;

    try {
      const contract = await this.model.create({
        name: name,
        email: email,
        profilePictureUrl: null,
        cusinePreferences: cusinePreferences,
        dietaryRestrictions: dietaryRestrictions,
      });

      return res.json("success");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // get user profile
  async getUserProfile(req, res) {
    const { email } = req.params;

    try {
      const userProfile = await this.model.findOne({
        where: { email: email },
      });

      return res.json(userProfile);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // update user picture
  async updateUserPicture(req, res) {
    const { email, profilePictureUrl } = req.body;

    try {
      const userProfile = await this.model.update(
        { profilePictureUrl: profilePictureUrl },
        {
          where: {
            email: email,
          },
        }
      );

      return res.json(userProfile);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // update user cuisine preferences
  async updateCusinePreferences(req, res) {
    const { userId, cusinePreferences } = req.body;

    try {
      const output = await this.model.update(
        { cusinePreferences: cusinePreferences },
        {
          where: {
            id: userId,
          },
        }
      );
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // update user dietiary restrictions
  async updateDietiaryRestrictions(req, res) {
    const { userId, dietaryRestrictions } = req.body;

    try {
      const output = await this.model.update(
        { dietaryRestrictions: dietaryRestrictions },
        {
          where: {
            id: userId,
          },
        }
      );
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = UsersController;
