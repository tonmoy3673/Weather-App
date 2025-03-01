console.log("connected");
// ========= API Key =============//
// Const Main URL= https://api.openweathermap.org/data/2.5/weather?q=germany&appid=58e2668dce7ceb8bbb5f2f6714cb2de7&units=metric
const apiKey = "58e2668dce7ceb8bbb5f2f6714cb2de7";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=dhaka";

// ============= Check Weather Function ==========//
const checkWeather = async (cityName) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;
  const res = await fetch(URL);
  const data = await res.json();
  const {weather,main,wind,name,dt} = data;
  const errorText = document.getElementById('error');
  const weatherImage = document.getElementById('weather-img');
  let date = new Date (dt * 1000);
  
// ======= Error Handling ===========//
if (!res.ok) {
  document.getElementById('weather-details').style.display='none';
   errorText.style.display='block'
   errorText.innerText='Invalid Name Found!!'
   return;
}
errorText.style.display = 'none'; // Hide the error message
document.getElementById('weather-details').style.display = 'block';

// ========== weather image set up ==========//
if (weather[0]?.main === 'Clear') {
    weatherImage.src='/images/clear.png'
}
else if(weather[0]?.main === 'Clouds'){
    weatherImage.src='/images/clouds.png'
}
else if(weather[0]?.main === 'Rain'){
    weatherImage.src='/images/rain.png'
}
else if(weather[0]?.main === 'Drizzle'){
    weatherImage.src='/images/drizzle.png'
}
else if(weather[0]?.main === 'Mist'){
    weatherImage.src='/images/mist.png'
}
else if(weather[0]?.main === 'Snow'){
    weatherImage.src='/images/snow.png'
}


// ========= display temp =========//
document.getElementById('temp').innerText= main?.temp ? main?.temp.toFixed(1) : 'Not Found!'
// ========= display weather type ==========//
document.getElementById('weather-type').innerText=weather[0]?.main ? weather[0]?.main : 'Not Found!'
// ========= display city name =========//
 document.getElementById('city-name').innerText= name ? name : 'Not Found!'
//  ========== display date ============//
document.getElementById('date-time').innerText = date.toLocaleString('en-GB', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric' 
  });
//  =========== display humidity =========//
document.getElementById('humidity').innerText= main?.humidity ? main?.humidity : "Not Found!"
// ========== display wind speed ========//
document.getElementById('wind').innerText=wind?.speed ? wind?.speed : "Not Found!"
};


 // ============= Search By City Name =======//
 const searchCityName =()=>{
    const inputField = document.getElementById('input-field').value;
    if (inputField.trim() === "") {
        const errorText = document.getElementById('error')
        errorText.style.display='block'
        errorText.innerText='Invalid Keyword!!';
        document.getElementById('weather-details').style.display='none';
        return;
    

    }
    const errorText = document.getElementById('error');
  errorText.style.display = 'none'

    console.log(inputField);
    // ========== Call checkWeather Function ========//
    checkWeather(inputField)
 }