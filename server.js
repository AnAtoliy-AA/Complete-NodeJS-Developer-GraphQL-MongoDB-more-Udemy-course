const express = require("express");

const friendsController = require('./controllers/friends.controller')
const messagesController = require('./controllers/messages.controller')

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  const startTime = Date.now();

  next();

  const endTime = Date.now();
  const delta = endTime - startTime;

  console.log(`${req.method} ${req.url} executed ${delta} ms`);
});

app.use(express.json());

app.post("/friends", friendsController.postFriend);
app.get("/friends", friendsController.getFriends);
app.get("/friends/:friendId", friendsController.getFriend);

app.get("/messages", messagesController.getMessages);
app.post("/messages", messagesController.postMessage);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
