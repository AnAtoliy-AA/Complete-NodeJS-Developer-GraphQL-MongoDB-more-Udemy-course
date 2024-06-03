const fs = require("fs");
const path = require('path');
const { parse } = require("csv-parse");

const planets = require('./planets.mongo');

const habitablePlanets = [];

const CONFIRMED_FLAG = "CONFIRMED";

const MAX_AMOUNT_OF_LIGHT = 1.11; //with higher value water on surface will disappear so fast
const MIN_AMOUNT_OF_LIGHT = 0.36; //with lower value temperature gets far to low

const MAX_PLANET_RADIUS = 1.6; // times bigger than Earth

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === CONFIRMED_FLAG &&
    planet["koi_insol"] > MIN_AMOUNT_OF_LIGHT &&
    planet["koi_insol"] < MAX_AMOUNT_OF_LIGHT &&
    planet["koi_prad"] < MAX_PLANET_RADIUS
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
         // TODO: Replace below create with insert + update upsert
          // await planets.create({
            // keplerName: data.kepler_name,
          // });
        }
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve()
      });
  })
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
