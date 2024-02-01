const express = require("express");
const path = require('path');

const friendsRouter = require('./routes/friends.router')
const messagesRouter = require('./routes/messages.router')

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  const startTime = Date.now();

  next();

  const endTime = Date.now();
  const delta = endTime - startTime;

  console.log(`${req.method} ${req.url} executed ${delta} ms`);
});

app.use('/site', express.static(path.join(__dirname,'public')))

app.use(express.json());

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
