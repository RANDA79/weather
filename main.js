
const todayName = document.getElementById('today-name');
const todayNum = document.getElementById('today-num');
const todayMonth = document.getElementById('today-moth');

const todayCity = document.getElementById('city');
const todayTemp = document.getElementById('today-temp');
const todayIcon = document.getElementById('icon-temp');
const todayWeather = document.getElementById('weather');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const windDir = document.getElementById('wind_direction');

// next days
const dayName = document.querySelectorAll(".next_day_name");
const dayMaxtemp = document.querySelectorAll(".next_max_temp");
const dayMintemp = document.querySelectorAll(".next_min_temp");
const weatherText = document.querySelectorAll(".weather_text");
const weatherimg = document.querySelectorAll(".next_img");
const search = document.getElementById('search')
console.log(weatherimg)

 async function fetchApi(city) {
    let weatherResponse =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7a3c8c6197b24f5881b132918232808&q=${city}&days=3`);
    let weatherData = await weatherResponse.json()
   
    return weatherData
}

// console.log(weatherData);


function displayCurrentDate(api) {
    // current day
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-Us",{weekday:"long"});
    todayNum.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-Us",{month:"long"})
    todayCity.innerHTML = api.location.name;
    todayTemp.innerHTML = api.current.temp_c;
    todayWeather.innerHTML = api.current.condition.text;
    todayIcon.src = api.current.condition.icon;
    humidity.innerHTML = api.current.humidity;
    wind.innerHTML = api.current.wind_kph + 'km/h';
    windDir.innerHTML = api.current.wind_dir;

}


function nextDays(api) {

let forcastNextDays = api.forecast.forecastday
console.log(forcastNextDays.length)

 for (let i = 0; i < forcastNextDays.length-1; i++) {
    let nextDay =new Date(forcastNextDays[i+1].date);

    dayName[i].innerHTML = nextDay.toLocaleDateString("en-Us",{weekday:"long"});
    dayMaxtemp[i].innerHTML = forcastNextDays[i+1].day.maxtemp_c;
    dayMintemp[i].innerHTML = forcastNextDays[i+1].day.mintemp_c;
    weatherText[i].innerHTML = forcastNextDays[i+1].day.condition.text;
    weatherimg[i].src = forcastNextDays[i+1].day.condition.icon;
 }
   
}

async function displayApiDate(city="cairo") {

let weatherapi = await fetchApi(city)
   
    displayCurrentDate(weatherapi)
    nextDays(weatherapi)
}

displayApiDate() 

search.addEventListener("input",function(){
    displayApiDate(search.value)
})