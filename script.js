const API_KEY = "d6d559b668cd680191e9adb394b87ff8";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const weatherType = document.getElementById("weatherType");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const visibility = document.getElementById("visibility");
const weatherIcon = document.getElementById("weatherIcon");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

async function getWeather(city) {

    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        if (data.cod != 200) {

            alert("City Not Found");

            return;

        }

        temperature.innerHTML = Math.round(data.main.temp) + "°C";

        cityName.innerHTML = data.name + ", " + data.sys.country;

        weatherType.innerHTML = data.weather[0].main;

        humidity.innerHTML = data.main.humidity + "%";

        wind.innerHTML = (data.wind.speed * 3.6).toFixed(1) + " km/h";

        feelsLike.innerHTML = Math.round(data.main.feels_like) + "°C";

        visibility.innerHTML = (data.visibility / 1000).toFixed(1) + " km";

        weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        sunrise.innerHTML = formatTime(data.sys.sunrise);

        sunset.innerHTML = formatTime(data.sys.sunset);

    }

    catch (error) {

        alert("Something Went Wrong");

        console.log(error);

    }

}

function formatTime(time) {

    const date = new Date(time * 1000);

    return date.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {

        getWeather(city);

    }

});

cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        searchBtn.click();

    }

});

getWeather("Delhi");