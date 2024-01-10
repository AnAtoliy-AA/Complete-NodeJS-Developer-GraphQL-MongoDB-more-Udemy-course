const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send({ id: 1, name: "some name" });
});

app.get("/messages", (req, res) => {
  res.send("<ul><li>Hello there!</li></ul>");
});

app.post("/messages", (req, res) => {
  console.log("Posting messages...");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
