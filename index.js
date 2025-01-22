const menuToggle = document.getElementById('menuToggle');
      const navLinks = document.querySelector('.nav-links');

      menuToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
      });

// Add event listener for the search box
document.getElementById('box').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      const location = event.target.value;
      if (location) {
        fetchWeather(location);
      }
    }
  });

  // Function to fetch weather data using a weather API
  async function fetchWeather(location) {
    const apiKey =// Replace with your actual API key
    const apiUrl =
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      updateUI(data);
    } catch (error) {
      alert(error.message);
    }
  }

  // Function to update the UI with weather data
  function updateUI(data) {
    // Extract data
    const { name, sys, main, weather, wind } = data;
    const weatherDescription = weather[0].description;
    const weatherIcon = weather[0].icon;
    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    // Update weather information
    document.querySelector('.location').textContent = ${name}, ${sys.country};
    document.querySelector('.weather-temp').textContent = ${temperature}°C;
    document.querySelector('.weather-desc').textContent = weatherDescription;
    document.querySelector('.weather-icon').setAttribute('data-feather', getWeatherIcon(weatherIcon));
    document.querySelector('.humidity .value').textContent = ${humidity} %;
    document.querySelector('.wind .value').textContent = ${windSpeed} km/h;

    // Replace updated feather icons
    feather.replace();
  }

  // Map weather conditions to feather icons
  function getWeatherIcon(iconCode) {
    const iconMap = {
      '01d': 'sun', // Clear day
      '01n': 'moon', // Clear night
      '02d': 'cloud', // Few clouds day
      '02n': 'cloud', // Few clouds night
      '03d': 'cloud', // Scattered clouds
      '03n': 'cloud',
      '04d': 'cloud', // Broken clouds
      '04n': 'cloud',
      '09d': 'cloud-rain', // Shower rain
      '09n': 'cloud-rain',
      '10d': 'cloud-drizzle', // Rain day
      '10n': 'cloud-drizzle', // Rain night
      '11d': 'cloud-lightning', // Thunderstorm
      '11n': 'cloud-lightning',
      '13d': 'cloud-snow', // Snow
      '13n': 'cloud-snow',
      '50d': 'cloud', // Mist
      '50n': 'cloud'
    };
    return iconMap[iconCode] || 'cloud';
  }

  // Display default location weather on page load
  window.onload = () => {
    fetchWeather('Punjab');
  };