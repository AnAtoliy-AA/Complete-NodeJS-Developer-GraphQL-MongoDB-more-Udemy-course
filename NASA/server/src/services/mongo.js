const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nasacluster.wsrnuaq.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster`;

mongoose.connection.once("open", () => console.log("Mongoose connection"));

mongoose.connection.on("error", (err) => console.error(err));

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  mongoConnect,
};
