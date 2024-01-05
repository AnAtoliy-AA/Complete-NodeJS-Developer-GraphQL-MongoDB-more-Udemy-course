const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

const CONFIRMED_FLAG = "CONFIRMED";

const MAX_AMOUNT_OF_LIGHT = 1.11; //with higher value water on surface will disappear so fast
const MIN_AMOUNT_OF_LIGHT = 0.36; //with lower value temperature gets far to low

const MAX_PLANET_RADIUS = 1.6 // times bigger than Earth

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === CONFIRMED_FLAG &&
    planet["koi_insol"] > MIN_AMOUNT_OF_LIGHT &&
    planet["koi_insol"] < MAX_AMOUNT_OF_LIGHT &&
    planet['koi_prad'] < MAX_PLANET_RADIUS
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.error(err);
  })
  .on("end", () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
    console.log("done");
  });
