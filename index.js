const express = require("express");
const app = express();

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
