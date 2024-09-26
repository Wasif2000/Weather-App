document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '355a77fec62e422bba1103052242609';

  // Function to fetch and display the weather for a given city
  function fetchWeather(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        const { location, current } = data;
        const { name, region } = location;
        const { temp_c, temp_f, condition, humidity, wind_kph, feelslike_c, pressure_mb, vis_km, uv } = current;

        // Update weather data in the DOM
        document.getElementById('city-name').textContent = `Weather in ${name}, ${region}`;
        document.getElementById('condition-text').textContent = condition.text;
        document.getElementById('temp-celsius').textContent = `${temp_c}°C`;
        document.getElementById('temp-fahrenheit').textContent = `${temp_f}°F`;
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('wind-speed').textContent = wind_kph;
        document.getElementById('feels-like').textContent = feelslike_c;
        document.getElementById('pressure').textContent = pressure_mb;
        document.getElementById('visibility').textContent = vis_km;
        document.getElementById('uv-index').textContent = uv;
        document.getElementById('icon').src = `https:${condition.icon}`;
      })
      .catch(error => {
        alert(error.message);
      });
  }

  // Set up the search functionality
  document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('search-city').value.trim();
    if (city) {
      fetchWeather(city);
      document.getElementById('search-display').textContent = `Searching for: ${city}`; // Display the city being searched
    } else {
      alert('Please enter a city');
    }
  });

  // Listen for input changes to update the display dynamically
  document.getElementById('search-city').addEventListener('input', (event) => {
    const cityInput = event.target.value.trim();
    document.getElementById('search-display').textContent = `Searching for: ${cityInput}`; // Display what user types
  });

  // Initialize with weather of Chicago
  fetchWeather('Chicago');

  // Add event listeners to the navbar city buttons
  document.querySelectorAll('.city-btn').forEach(button => {
    button.addEventListener('click', () => {
      const city = button.getAttribute('data-city');
      fetchWeather(city);
      document.getElementById('search-display').textContent = `Searching for: ${city}`; // Update display when using buttons
    });
  });

  // Function to update Chicago time in the DOM
  function updateChicagoTime() {
    const now = new Date();
    
    // Fetch the current Chicago time using Intl API with the correct timezone
    const chicagoDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(now);

    const chicagoTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);

    // Update Chicago time in the DOM
    document.getElementById('live-date').textContent = chicagoDate;
    document.getElementById('live-time').textContent = chicagoTime;
  }

  // Update the time every second
  setInterval(updateChicagoTime, 1000);
});
