const express = require("express");

const app = express();

const PORT = 3000;

const friends = [
  { id: 0, name: "some name" },
  { id: 1, name: "another name" },
];

app.use((req, res, next) => {
  const startTime = Date.now();

  next();

  const endTime = Date.now();
  const delta = endTime - startTime;

  console.log(`${req.method} ${req.url} executed ${delta} ms`);
});

app.use(express.json());

app.post("/friends", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing friend name" });
  }

  const newFriend = {
    name,
    id: friends.length,
  };

  friends.push(newFriend);

  res.json(newFriend);
});

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = Number(req.params.friendId);

  const friend = friends.find((friend) => friend.id === friendId);

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
