const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("There was an error!", error);
//     return;
//   } else {
//     console.log("It worked!", IP);
//   }
// });

fetchCoordsByIP("99.240.164.66", (error, coordinates) => {
  if (error) {
    console.log("There was an error!", error);
    return;
  }
  console.log(coordinates);
});