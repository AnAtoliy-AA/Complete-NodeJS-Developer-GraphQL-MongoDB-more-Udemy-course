const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(planetsRouter);

module.exports = app;
