const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("There was an error!", error);
//     return;
//   } else {
//     console.log("It worked!", IP);
//   }
// });

// fetchCoordsByIP("99.240.164.66", (error, coordinates) => {
//   if (error) {
//     console.log("There was an error!", error);
//     return;
//   }
//   console.log(coordinates);
// });


// const coordinates = {latitude: 31.0522, longitude: -118.2437}
// fetchISSFlyOverTimes(coordinates, (error, coordinates) => {
//   if (error) {
//     console.log("There was an error!", error)
//     return;
//   }
//   console.log("Returned times", coordinates);
// })

const printOrbitTimes = orbitTimes => {
  for (let orbits of orbitTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(orbits.risetime);
    const duration = orbits.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
}

nextISSTimesForMyLocation((error, orbitTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printOrbitTimes(orbitTimes);
});