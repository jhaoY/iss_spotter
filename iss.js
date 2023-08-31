/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    if (!data.success) {
      const msg = `Success status was ${data.success}. Server message says ${data.message} when fetch for IP ${data.ip}`;
      callback(Error(msg), null);
      return;
    }
    const longitude = data.longitude;
    const latitude = data.latitude;
    const coordinates = { latitude, longitude };
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null)
      return;
    }
    const data = JSON.parse(body);
    if (data.message !== "success") {
      const msg = `Success status was ${data.message} when fetch for coordinates ${coords}`
      callback(Error(msg), null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code was ${response.statusCode} when fetching coordinates ${body}`
      callback(Error(msg), null)
      return;
    }
      const orbitTimes = data.response;
    callback(null, orbitTimes);
  })
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };