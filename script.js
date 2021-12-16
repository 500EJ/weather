let GRIDPOINTS_DAY_URL;
let GRIDPOINTS_HOURLY_URL;

function getForecastURL(callback) {
  let latitude = 40.7863;
  let longitude = -74.3301;
  const POINTS_URL = `https://api.weather.gov/points/${latitude},${longitude}`;

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
      callback();
    });
}

function setTemperatures() {
  const promise = fetch(GRIDPOINTS_HOURLY_URL);
  promise
    .then(function (response) {
      return response.json();
    })
    .then(function (processedResponse) {
      document.querySelectorAll(".current-temp").forEach(function (element) {
        element.innerText = processedResponse.properties.periods[0].temperature + element.innerText;
      })
      let detailedForecast = processedResponse.properties.periods[0].detailedForecast;
      let periods = processedResponse.properties.periods;
      document.querySelector(".description").innerText = detailedForecast ? detailedForecast : processedResponse.properties.periods[0].shortForecast;
      document.querySelectorAll(".hour").forEach(function (hour, i) {
        hour.querySelector("p").innerText = periods[i].temperature + hour.querySelector("p").innerText;
      })
    });
}

getForecastURL(setTemperatures);