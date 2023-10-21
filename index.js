const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { synthesizeSpeech } = require("./text2speech.js");

// router and controllers
const CategoriesRouter = require("./routers/CategoriesRouter");
const CategoriesController = require("./controllers/CategoriesController");
const FoldersRouter = require("./routers/FoldersRouter");
const FoldersController = require("./controllers/FoldersController");
const IngredientsRouter = require("./routers/IngredientsRouter");
const IngredientsController = require("./controllers/IngredientsController");
const InstructionsRouter = require("./routers/InstructionsRouter");
const InstructionsController = require("./controllers/InstructionsController");
const RecipesRouter = require("./routers/RecipesRouter");
const RecipesController = require("./controllers/RecipesController");
const UsersRouter = require("./routers/UsersRouter");
const UsersController = require("./controllers/UsersController");

const db = require("./db/models/index");
const { category, folder, ingredient, instruction, recipe, user } = db;

const categoriesController = new CategoriesController(category);
const categoriesRouter = new CategoriesRouter(
  express,
  categoriesController
).routes();

const foldersController = new FoldersController(folder, recipe);
const foldersRouter = new FoldersRouter(express, foldersController).routes();

const ingredientsController = new IngredientsController(ingredient);
const ingredientsRouter = new IngredientsRouter(
  express,
  ingredientsController
).routes();

const recipesController = new RecipesController(
  recipe,
  instruction,
  ingredient,
  user
);
const recipesRouter = new RecipesRouter(express, recipesController).routes();

const instructionsController = new InstructionsController(instruction);
const instructionsRouter = new InstructionsRouter(
  express,
  instructionsController
).routes();

const usersController = new UsersController(user);
const usersRouter = new UsersRouter(express, usersController).routes();

// routing
app.use(cors());
app.use(express.json());
app.use("/categories", categoriesRouter);
app.use("/folders", foldersRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/instructions", instructionsRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);

// to break the following code into its own controller and route files
app.post("/synthesize", express.json(), (req, res) => {
  const text = req.body.text;
  synthesizeSpeech(text)
    .then(() => res.sendFile(`${__dirname}/output.mp3`))
    .catch((err) => res.status(500).send(err.message));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
