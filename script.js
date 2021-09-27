const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemEl = document.getElementById('current-weather-item');

const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currenttempEl = document.getElementById('current-temp');

const API_KEY = 'ea87777dcd22162400476933cc7f56b0';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wedenesday', 'Thursday', 'Friday', 'Saturady']
const months = ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'nov', 'Dec']
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = hour + ':' + minutes;
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];



}, 1000);

getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        
        let{latitude, longitude}= success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res =>res.json()).then(data=> {
            console.log(data)

            showWeatherData(data);
        })
    })
}


function showWeatherData(data){
let{humidity , pressure , sunrise , sunset , wind_speed, temp}=data.current;

currentWeatherItemEl.innerHTML=
    `
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>winds peed</div>
        <div>${wind_speed}</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
</div>`;
  
let otherDayForecast=''

data.daily.forEach((day, idx) => {
    if(idx==0){
        currenttempEl.innerHTML=`
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">Monday</div>
        <div class="temp">Night - ${day.temp.night}&#176; C</div>
        <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div>`
    }else{
        otherDayForecast +=`<div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="temp">Night - ${day.temp.night}&#176; C</div>
        <div class="temp">Day - ${day.temp.day}; C</div>
    </div>`
    }
});

weatherForecastEl.innerHTML= otherDayForecast;

}

