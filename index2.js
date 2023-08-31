const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printOrbitTimes } = require('./index')

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body))

nextISSTimesForMyLocation()
  .then((orbitTimes) => {
    printOrbitTimes(orbitTimes);
  })
  .catch((error) => {
    console.log("Error occured!", error)
  }) 