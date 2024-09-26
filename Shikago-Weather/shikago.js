document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = '355a77fec62e422bba1103052242609';
    const city = 'Chicago';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      const { location, current } = data;
      const { name, region } = location;
      const { temp_c, temp_f, condition, humidity, wind_kph, feelslike_c } = current;
  
      // Update DOM
      document.getElementById('city-name').textContent = `${name}, ${region}`;
      document.getElementById('condition-text').textContent = condition.text;
      document.getElementById('temp-celsius').textContent = `${temp_c}°C`;
      document.getElementById('temp-fahrenheit').textContent = `${temp_f}°F`;
      document.getElementById('humidity').textContent = humidity;
      document.getElementById('wind-speed').textContent = wind_kph;
      document.getElementById('feels-like').textContent = feelslike_c;
      document.getElementById('icon').src = `https:${condition.icon}`;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  