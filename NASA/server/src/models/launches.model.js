const launches = require("./launches.mongo");

let latestFlightNumber = 100;

const launch = {
  flightNumber: latestFlightNumber,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

function isLaunchWithIdExist(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launches.find({}, {
    '_id': 0, '__v': 0
  });
}

async function saveLaunch(launch) {
  await launches.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  })
}

saveLaunch(launch)

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
