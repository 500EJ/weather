let latitude = 40.7863;
let longitude = -74.3301;
let gridX;
let gridY;
let center;
const POINTS_URL = `https://api.weather.gov/points/${latitude},${longitude}`;

const promise = fetch(POINTS_URL);
promise
    .then(function (response) {
        return response.json();
    })
    .then(function (processedResponse) {
        gridX = processedResponse.properties.gridX;
        gridY = processedResponse.properties.gridY;
        center = processedResponse.properties.cwa;
    })

const GRIDPOINTS_DAY_URL = `https://api.weather.gov/gridpoints/${center}/${gridX},${gridY}/forecast`;
const GRIDPOINTS_HOURLY_URL = `https://api.weather.gov/gridpoints/${center}/${gridX},${gridY}/forecast/hourly`;