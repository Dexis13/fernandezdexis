document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    getWeather(location);
});

async function getWeather(location) {
    const apiKey = '753d58978a0da480b8cbcaf8afc9e117'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            displayError(data.message);
        }
    } catch (error) {
        displayError('An error occurred while fetching the weather data.');
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    weatherResult.innerHTML = `
        <div><strong>Location:</strong> ${data.name}</div>
        <div><strong>Temperature:</strong> ${data.main.temp} °C</div>
        <div><strong>Weather:</strong> ${data.weather[0].description}</div>
        <div><strong>Humidity:</strong> ${data.main.humidity}%</div>
        <div><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
    `;
}

function displayError(message) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `<div style="color: red;">${message}</div>`;
}
