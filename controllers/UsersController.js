const BaseController = require("./BaseController");
const axios = require("axios");
require("dotenv").config();

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // get user's login count
  async getLoginCount(req, res) {
    const { email } = req.params;

    var options = {
      method: "GET",
      url: "https://dev-ou073hqmuqdme5yd.us.auth0.com/api/v2/users",
      params: { q: `email:${email}`, search_engine: "v3" },
      headers: { Authorization: `Bearer ${process.env.MANAGEMENT_API_KEY}` },
    };

    axios
      .request(options)
      .then(function (response) {
        return res.json(response.data);
      })
      .catch(function (error) {
        return res.status(400).json({ error: true, msg: err });
      });
  }
}

module.exports = UsersController;
