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
  const {weather,main,wind,name} = data;
  console.log(data);
//   ======= display temp =========//
if (res.status===404) {
   return alert('Invalid Name!!')
}

document.getElementById('temp').innerText= main?.temp ? main?.temp.toFixed(1) : 'Not Found!'
document.getElementById('weather-type').innerText=weather[0].main
 
};

 // ============= Search By City Name =======//
 const searchCityName =()=>{
    const inputField = document.getElementById('input-field').value;
    console.log(inputField);
    // ========== Call checkWeather Function ========//
    checkWeather(inputField)
 }