const API_KEY = "8ddb602cd571162b55b6f812133554e9";

const input = document.querySelector(".search-box input");
const button = document.querySelector(".search-box button");

const weatherBox = document.querySelector(".weather-box");
const errorBox = document.querySelector(".error-box");

const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

button.addEventListener("click", getWeather);

async function getWeather() {
    const city = input.value.trim();
    if (!city) return;

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await res.json();

    if (data.cod === "404") {
        showError();
        return;
    }

    showWeather(data);
}

function changeBackground(condition) {
    if (condition === "Clear") {
        document.body.style.background ="linear-gradient(to right, #fceabb, #f8b500) ";
    } else if (condition == "Rain"){
       document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
  } else if (condition === "Clouds") {
    document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } 
    }

function showWeather(data) {
    errorBox.style.display = "none";
    weatherBox.style.display = "block";

    temp.textContent = `${Math.round(data.main.temp)}°C`;
    desc.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${Math.round(data.wind.speed)} Km/h`;

    setIcon(data.weather[0].main);
}

function showError() {
    weatherBox.style.display = "none";
    errorBox.style.display = "block";
}

function setIcon(type) {
    const icons = {
        Clear: "images/clear.png",
        Rain: "images/rain.png",
        Snow: "images/snow.png",
        Clouds: "images/cloud.png",
        Mist: "images/mist.png",
        Haze: "images/mist.png"
    };

    icon.src = icons[type] || "images/cloud.png";
}