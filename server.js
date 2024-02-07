const express = require("express");
const path = require('path');

const friendsRouter = require('./routes/friends.router')
const messagesRouter = require('./routes/messages.router')

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

const PORT = 3000;

app.use((req, res, next) => {
  const startTime = Date.now();

  next();

  const endTime = Date.now();
  const delta = endTime - startTime;

  console.log(`${req.method} ${req.url} executed ${delta} ms`);
});

app.use('/', express.static(path.join(__dirname,'public')))

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Mountain', caption: 'Let\'s go to the mountains!' });
});
app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
