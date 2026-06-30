// Check if user is logged in
if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "index.html";
}

const apiKey = "6c2ce4bef2ae464db8e143101263006";
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const forecast = document.getElementById("forecast");

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    getWeather(city);

});

async function getWeather(city) {

    try {

        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
        );

        const data = await response.json();

        if (data.error) {
            alert(data.error.message);
            return;
        }

        cityName.textContent = data.location.name;

        temperature.textContent =
            data.current.temp_c + "°C";

        condition.textContent =
            data.current.condition.text;

        humidity.textContent =
            data.current.humidity;

        wind.textContent =
            data.current.wind_kph;

        forecast.innerHTML = "";

        data.forecast.forecastday.forEach(day => {

            forecast.innerHTML += `
                <div class="forecast-card">

                    <h3>${day.date}</h3>

                    <img src="https:${day.day.condition.icon}">

                    <h2>${day.day.avgtemp_c}°C</h2>

                    <p>${day.day.condition.text}</p>

                </div>
            `;

        });

        changeBackground(data.current.condition.text);

    } catch (error) {

        alert("Unable to fetch weather.");

        console.log(error);

    }

}

function changeBackground(weather) {

    weather = weather.toLowerCase();

    if (weather.includes("sun")) {

        document.body.style.background =
            "linear-gradient(135deg,#f6d365,#fda085)";

    }

    else if (weather.includes("rain")) {

        document.body.style.background =
            "linear-gradient(135deg,#4facfe,#00f2fe)";

    }

    else if (weather.includes("cloud")) {

        document.body.style.background =
            "linear-gradient(135deg,#bdc3c7,#2c3e50)";

    }

    else if (weather.includes("snow")) {

        document.body.style.background =
            "linear-gradient(135deg,#E6DADA,#274046)";

    }

    else {

        document.body.style.background =
            "linear-gradient(135deg,#56ccf2,#2f80ed)";

    }

}

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

});