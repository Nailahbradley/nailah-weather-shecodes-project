//current date and time
function formDate(timestamp) {
  let now = new Date(timestamp);
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
  return `${day} ${hour}:${minutes}`;
}

//Date and Time
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
            <div class="borders">
       <img src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png" alt="" width="37">
        <div class="week">${formatDay(forecastDay.dt)}</div>
        <div class="temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° <span class="temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
            </div>
            </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getWeatherForecast(coordinates) {
  let apiKey = "cdfcb64b7f4fb64ab376e215b5000fa5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

//forecast

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".headerDegree").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = response.data.main.humidity;
  let currentHumitdity = document.querySelector("#humidity");
  currentHumitdity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind} m/h `;
  document.querySelector("#weather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#daysAndTime").innerHTML = formDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#iconWeather");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  fahrenheitTemperature = response.data.main.temp;

  getWeatherForecast(response.data.coord);
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
  let dateTime = document.querySelector("#daysAndTime");
  dateTime.innerHTML = formDate(response.data.dt * 1000);
  currentWeather.innerHTML = `${weather}`;
  currentHumitdity.innerHTML = `Humidity: ${humidity}%`;
  currentWind.innerHTML = `Wind: ${wind} m/h `;
  currentTemp.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${city}`;

  fahrenheitTemperature = response.data.main.temp;
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

let fahrenheitTemperature = null;

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", handleSubmit);
search("Chicago");
