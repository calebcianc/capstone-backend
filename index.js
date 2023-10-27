// console.log("Environment variable DIALECT:", process.env.DIALECT);
// console.log(process.env.NODE_ENV);

const env = process.env.NODE_ENV || "production";
const config = require(__dirname + "/config/database.js")[env];
const cors = require("cors");
const express = require("express");
const app = express();
const Sequelize = require("sequelize");

require("dotenv").config();
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
    }
  );
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialect: config.dialect || "postgres", // <-- Explicitly provide dialect
  });
}

const { synthesizeSpeech } = require("./text2speech.js");

// router and controllers
const CookbooksRouter = require("./routers/CookbooksRouter.js");
const CookbooksController = require("./controllers/CookbooksController.js");
const IngredientsRouter = require("./routers/IngredientsRouter");
const IngredientsController = require("./controllers/IngredientsController");
const InstructionsRouter = require("./routers/InstructionsRouter");
const InstructionsController = require("./controllers/InstructionsController");
const RecipesRouter = require("./routers/RecipesRouter");
const RecipesController = require("./controllers/RecipesController");
const UsersRouter = require("./routers/UsersRouter");
const UsersController = require("./controllers/UsersController");

const db = require("./db/models/index");
const { cookbook, ingredient, instruction, recipe, user } = db;

const cookbooksController = new CookbooksController(
  cookbook,
  recipe,
  user,
  ingredient,
  instruction
);
const cookbooksRouter = new CookbooksRouter(
  express,
  cookbooksController
).routes();

const ingredientsController = new IngredientsController(ingredient);
const ingredientsRouter = new IngredientsRouter(
  express,
  ingredientsController
).routes();

const recipesController = new RecipesController(
  recipe,
  instruction,
  ingredient,
  user,
  cookbook
);
const recipesRouter = new RecipesRouter(express, recipesController).routes();

const instructionsController = new InstructionsController(instruction);
const instructionsRouter = new InstructionsRouter(
  express,
  instructionsController
).routes();

const usersController = new UsersController(user, cookbook);
const usersRouter = new UsersRouter(express, usersController).routes();

// routing
app.use(cors());
app.use(express.json());
app.use("/cookbooks", cookbooksRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/instructions", instructionsRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);

// code which uses google's text2speech module
app.post("/synthesize", express.json(), (req, res) => {
  const text = req.body.text;
  synthesizeSpeech(text)
    .then(() => res.sendFile(`${__dirname}/output.mp3`))
    .catch((err) => res.status(500).send(err.message));
});

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // Listen on all network interfaces
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
