const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();

const app = require("./app");

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nasacluster.wsrnuaq.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster`;

const server = http.createServer(app);

mongoose.connection.once('open', () => console.log('Mongoose connection'));

mongoose.connection.on('error', (err) => console.error(err));

async function startServer() {
    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
};

startServer();
