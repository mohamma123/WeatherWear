
function fetchWeatherAndRecommend() {
    const apiKey = '5b7d9eb5d33eaae49004446ec0be8292';
    const city = document.getElementById('location').value;
    // Using CORS proxy to bypass cross-origin restrictions
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].main;
            const description = data.weather[0].description;
            const temperature = data.main.temp - 273.15;  // Convert Kelvin to Celsius            
            
            // Display weather emoji and description
            const weatherEmoji = getWeatherEmoji(weather);
            document.getElementById('weatherEmoji').innerText = weatherEmoji;
            document.getElementById('weatherDescription').innerText = description.charAt(0).toUpperCase() + description.slice(1);

            // Generate and display recommendation
            const recommendation = generateRecommendation(weather, temperature);
            document.getElementById('recommendation').innerText = recommendation;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('recommendation').innerText = 'Unable to fetch weather data. Please try again later.';
        });
}

function generateRecommendation(weather, temperature) {
    // This is a basic recommendation based on weather and temperature
    if (weather === 'Rain') {
        return "It's rainy! Wear a waterproof jacket and carry an umbrella.";
    } else if (temperature < 10) {
        return "It's cold! Wear a warm jacket and a scarf.";
    } else {
        return "It's a pleasant day! Wear something comfortable.";
    }
}

function getWeatherEmoji(weather) {
    switch (weather) {
        case 'Clear': return '☀️';
        case 'Clouds': return '☁️';
        case 'Rain': return '🌧️';
        case 'Snow': return '❄️';
        case 'Thunderstorm': return '⛈️';
        default: return '❓';
    }
}
