const launches = require("./launches.mongo");

let latestFlightNumber = 100;

function isLaunchWithIdExist(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launches.find({});
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["Zero To Mastery, NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);

  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  isLaunchWithIdExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
