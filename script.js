let GRIDPOINTS_DAY_URL;
let GRIDPOINTS_HOURLY_URL;

function getForecastURL() {
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
      setTemperatures();
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
        hour.querySelector(".temperature").innerText = periods[i + 1].temperature + hour.querySelector("p").innerText;
        hour.querySelector("img").setAttribute("src", periods[i + 1].icon);
        let times = periods[i + 1].startTime.split("T");
        hour.querySelector("h3").innerText = times[1].split("-")[0].slice(0, -3);
        setDayForecast();
      })
    });
}

function setDayForecast() {
  const promise = fetch(GRIDPOINTS_DAY_URL);
  promise
    .then(function (response) {
      return response.json();
    })
    .then(function (processedResponse) {
      document.querySelectorAll(".day").forEach(function (day, i) {
        let periods = processedResponse.properties.periods;
        day.querySelector("h3").innerText = periods[i].name;
        day.querySelector("img").setAttribute("src", periods[i].icon);
        day.querySelector(".temperature").innerText = periods[i].temperature + "??";
      })
    });
}

getForecastURL();