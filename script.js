document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "355a77fec62e422bba1103052242609";
    const city = "Chicago";
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();

            // Update the temperature and description
            document.getElementById("temperature").textContent = data.current.temp_c;
            document.getElementById("weather-description").textContent = data.current.condition.text;

            // Additional weather details
            const weatherDetails = `
                <li class="flex items-center space-x-3">
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Humidity: ${data.current.humidity}%</span>
                </li>
                <li class="flex items-center space-x-3">
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Wind Speed: ${data.current.wind_kph} km/h</span>
                </li>
                <li class="flex items-center space-x-3">
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Feels like: ${data.current.feelslike_c}°C</span>
                </li>
                <li class="flex items-center space-x-3">
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>UV Index: ${data.current.uv}</span>
                </li>
            `;

            document.getElementById("weather-details").innerHTML = weatherDetails;
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // Fetch weather data on page load
    fetchWeatherData();
});
