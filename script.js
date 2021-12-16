let latitude = 40.7863;
let longitude = -74.3301;
const POINTS_URL = `https://api.weather.gov/points/${latitude},${longitude}`;
let GRIDPOINTS_DAY_URL;
let GRIDPOINTS_HOURLY_URL

const promise = fetch(POINTS_URL);
promise
  .then(function (response) {
    return response.json();
  })
  .then(function (processedResponse) {
    let gridX = processedResponse.properties.gridX;
    let gridY = processedResponse.properties.gridY;
    let center = processedResponse.properties.gridId;
    GRIDPOINTS_DAY_URL = `https://api.weather.gov/gridpoints/${center}/${gridX},${gridY}/forecast`;
    GRIDPOINTS_HOURLY_URL = `https://api.weather.gov/gridpoints/${center}/${gridX},${gridY}/forecast/hourly`;
  })