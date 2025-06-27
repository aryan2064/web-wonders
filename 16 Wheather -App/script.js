var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
var messageEl = document.getElementById("message");
var weatherResult = document.getElementById("weatherResult");
var cityNameEl = document.getElementById("cityName");
var temperatureEl = document.getElementById("temperature");
var conditionEl = document.getElementById("condition");
var humidityEl = document.getElementById("humidity");
var weatherIconEl = document.getElementById("weatherIcon");

var API_KEY = "API_Key";
var API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=CITY_NAME&appid=API_KEY&units=metric";

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  var city = cityInput.value.trim();

  if (city === "") {
    showMessage("Please enter a city name.", "error");
    hideWeather();
    return;
  }

  showMessage("Fetching weather data...", "loading");
  hideWeather();

  var url = API_URL.replace("CITY_NAME", encodeURIComponent(city)).replace(
    "API_KEY",
    API_KEY,
  );

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(function (data) {
      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      cityNameEl.textContent = data.name;
      temperatureEl.textContent = Math.round(data.main.temp) + " °C";
      conditionEl.textContent = data.weather[0].main;
      humidityEl.textContent = data.main.humidity + "%";

      var iconCode = data.weather[0].icon;
      weatherIconEl.src =
        "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      weatherIconEl.alt = data.weather[0].main;

      clearMessage();
      showWeather();
    })
    .catch(function (error) {
      showMessage("City not found. Please try again.", "error");
      hideWeather();
    });
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message " + type;
}

function clearMessage() {
  messageEl.textContent = "";
  messageEl.className = "message";
}

function showWeather() {
  weatherResult.classList.remove("hidden");
}

function hideWeather() {
  weatherResult.classList.add("hidden");
}
