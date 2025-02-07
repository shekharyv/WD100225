const API_KEY = "c4abd0552078bc79c03cc728f038e4ca"; // Replace with your actual API key

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorMessage = document.getElementById("error-message");
    const weatherInfo = document.getElementById("weatherInfo");

    // Hide error message initially
    errorMessage.classList.add("hidden");
    weatherInfo.classList.add("hidden");

    if (city === "") {
        showError("⚠️ Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("❌ City not found!");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    document.getElementById("cityName").innerText = `📍 ${data.name}`;
    document.getElementById("temperature").innerText = `🌡️ ${data.main.temp}°C`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("condition").innerText = `🌤️ ${data.weather[0].description}`;

    // Weather Icon
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Change background color
    changeBackground(data.weather[0].main);

    // Show weather info
    document.getElementById("weatherInfo").classList.remove("hidden");
}

function changeBackground(condition) {
    const body = document.body;
    body.className = ""; // Reset previous classes

    const weatherClasses = {
        "Clear": "sunny",
        "Clouds": "cloudy",
        "Rain": "rainy",
        "Snow": "snowy",
        "Thunderstorm": "thunderstorm",
        "Drizzle": "rainy",
        "Mist": "misty"
    };

    if (weatherClasses[condition]) {
        body.classList.add(weatherClasses[condition]);
    }
}

function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = message;
    errorMessage.classList.remove("hidden");
}
