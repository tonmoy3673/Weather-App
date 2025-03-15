const apiKey = "58e2668dce7ceb8bbb5f2f6714cb2de7";

// ============= Check Weather Function ==========//
const checkWeather = async (cityName) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;
    const res = await fetch(URL);
    
    if (!res.ok) {
        const errorText = document.getElementById('error');
        if (errorText) {
            document.getElementById('weather-details')?.style.setProperty('display', 'none');
            errorText.style.display = 'block';
            errorText.innerText = 'Invalid City Name Found!!';
        }
        return;
    }
    
    const data = await res.json();
    const { weather, main, wind, name, dt, timezone } = data;
    const errorText = document.getElementById('error');
    const weatherImage = document.getElementById('weather-img');
    const weatherDetails = document.getElementById('weather-details');

    if (errorText) errorText.style.display = 'none'; // Hide the error message
    if (weatherDetails) weatherDetails.style.display = 'flex';

    // ========== weather image setup ==========//
    if (weatherImage) {
        if (weather[0]?.main === 'Clear') {
            weatherImage.src = '/images/clear.png';
        } else if (weather[0]?.main === 'Clouds') {
            weatherImage.src = '/images/clouds.png';
        } else if (weather[0]?.main === 'Rain') {
            weatherImage.src = '/images/rain.png';
        } else if (weather[0]?.main === 'Drizzle') {
            weatherImage.src = '/images/drizzle.png';
        } else if (weather[0]?.main === 'Mist') {
            weatherImage.src = '/images/mist.png';
        } else if (weather[0]?.main === 'Snow') {
            weatherImage.src = '/images/snow.png';
        }
    }

    // ========= display temp =========//
    const tempElement = document.getElementById('temp');
    if (tempElement) tempElement.innerText = main?.temp ? main?.temp.toFixed(1) : 'Not Found!';

    // ========= display weather type ==========//
    const weatherTypeElement = document.getElementById('weather-type');
    if (weatherTypeElement) weatherTypeElement.innerText = weather[0]?.main ? weather[0]?.main : 'Not Found!';

    // ========= display city name =========//
    const cityNameElement = document.getElementById('city-name');
    if (cityNameElement) cityNameElement.innerText = name ? name : 'Not Found!';

    // ========== Convert timestamp to location's local time based on timezone ==========//
    const utcTimestamp = dt * 1000;
    
    // Convert the UTC timestamp to the city's local time by adding the timezone offset
    const cityLocalTime = new Date(utcTimestamp + (timezone * 1000));
    
    // Format the date string using UTC methods to prevent browser timezone interference
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const weekday = weekdays[cityLocalTime.getUTCDay()];
    const month = months[cityLocalTime.getUTCMonth()];
    const day = cityLocalTime.getUTCDate();
    const year = cityLocalTime.getUTCFullYear();
    
    // Format time in 12-hour format with AM/PM
    let hours = cityLocalTime.getUTCHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes = cityLocalTime.getUTCMinutes().toString().padStart(2, '0');
    
    // Combine all parts to create the final date-time string
    const dateTimeString = `${weekday}, ${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
    
    // Check if date-time element exists before setting its text
    const dateTimeElement = document.getElementById('date-time');
    if (dateTimeElement) dateTimeElement.innerText = dateTimeString;

    // =========== Display GMT+X Timezone =========//
    const timezoneOffset = timezone / 3600; // Convert seconds to hours
    const sign = timezoneOffset >= 0 ? '+' : '-';
    const timezoneDisplay = `GMT${sign}${Math.abs(timezoneOffset)}`;
    
    const timezoneElement = document.getElementById('timezone');
    if (timezoneElement) timezoneElement.innerText = timezoneDisplay; // Display GMT+X or GMT-X

    // =========== display humidity =========//
    const humidityElement = document.getElementById('humidity');
    if (humidityElement) humidityElement.innerText = main?.humidity ? main?.humidity : "Not Found!";

    // ========== display wind speed ========//
    const windElement = document.getElementById('wind');
    if (windElement) windElement.innerText = wind?.speed ? wind?.speed : "Not Found!";
};

// ============= Search By City Name =======//
const searchCityName = () => {
    const inputField = document.getElementById('input-field');
    if (!inputField || inputField.value.trim() === "") {
        const errorText = document.getElementById('error');
        if (errorText) {
            errorText.style.display = 'block';
            errorText.innerText = 'Please enter a valid city name!';
        }
        const weatherDetails = document.getElementById('weather-details');
        if (weatherDetails) weatherDetails.style.display = 'none';
        return;
    }

    const errorText = document.getElementById('error');
    if (errorText) errorText.style.display = 'none';

    // ========== Call checkWeather Function ========//
    checkWeather(inputField.value);
};

// Check if all necessary elements exist before running the default action
document.addEventListener('DOMContentLoaded', () => {
    // ============ Default city =========//
    checkWeather('Dhaka');
});