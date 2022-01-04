let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateTime = document.querySelector("#daysAndTime");
dateTime.innerHTML = `Last updated: ${day}  ${hour}:${minutes}`;
//Date and Time

function displayWeather(response) {
  console.log(response.data.name);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".headerDegree").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = response.data.main.humidity;
  let currentHumitdity = document.querySelector("#humidity");
  currentHumitdity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind} km/h `;
  document.querySelector("#weather").innerHTML =
    response.data.weather[0].description;
}
function search(city) {
  let apiKey = "cdfcb64b7f4fb64ab376e215b5000fa5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  search(city); //call this function above
  //let cityElement = document.querySelector("h1");
  //let cityInput = document.querySelector("#inputCity").value;
  // cityInput.value; (You can put it together )
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showTemperatureCurrent(response) {
  let weather = response.data.weather[0].description;
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let currentWeather = document.querySelector("#weather");
  let currentCity = document.querySelector("h1");
  let currentTemp = document.querySelector(".headerDegree");
  let currentHumitdity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  currentWeather.innerHTML = `${weather}`;
  currentHumitdity.innerHTML = `Humidity: ${humidity}%`;
  currentWind.innerHTML = `Wind: ${wind} km/h `;
  currentTemp.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${city}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "cdfcb64b7f4fb64ab376e215b5000fa5";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperatureCurrent);
}
let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", handleSubmit);
search("Chicago");