/// date
function formatDate(date) {
  let numberDate = date.getUTCDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  return `${currentDay}, ${numberDate}, ${hours}:${minutes}`;
}
let now = new Date();
let currentDate = document.querySelector("#currentTime");
currentDate.innerHTML = formatDate(now);

/// weather
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidityValue").innerHTML =
    response.data.main.humidity;
  document.querySelector("#descriptionDiv").innerHTML =
    response.data.weather[0].main;
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "763b250b80fa958302cdd5a87d7a2da5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", citySubmit);

/// current location
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "763b250b80fa958302cdd5a87d7a2da5";
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(locationUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

/// temperature conversion

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = 8;
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = 0;
}
let clickCelsius = document.querySelector("#celsius-conversionLink");
clickCelsius.addEventListener("click", convertToCelsius);

let clickFahrenheit = document.querySelector("#fahrenheit-conversionLink");
clickFahrenheit.addEventListener("click", convertToFahrenheit);
