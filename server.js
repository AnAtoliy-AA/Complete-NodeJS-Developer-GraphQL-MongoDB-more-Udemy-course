const express = require("express");

const app = express();

const PORT = 3000;

const friends = [{ id: 0, name: "some name" }, { id: 1, name: "another name" }]

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = Number(req.params.friendId)

  const friend = friends.find((friend) => friend.id === friendId)

  if (!friend) {
    res.status(404).json({ error: "No friends found" });
  }

  res.status(200).json(friend);
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
