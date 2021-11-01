//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi = {
    key: "49254762f57d0cb9437392a3d337b617",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}


const searchInputBox = document.getElementById('input-box');

//event listner function on key pre
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
});

//Get Weather report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}


//Show Weather report
function showWeatherReport(weather) {
    console.log(weather);

    let City = document.getElementById('city');
    City.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todaydate = new Date();
    date.innerText = dateManage(todaydate);

    //background according to weather

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('sunny1.jpg')";
    } else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('Cloudy.jpg')";
    } else if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('Cloudy.jpg')";
    } else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('rainy.jpg')";
    } else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('snowfall.jpg')";
    } else if (weatherType.textContent == 'Thunderstrorm') {
        document.body.style.backgroundImage = "url('thunderstorm.jpg')";
    } else if (weatherType.textContent == 'Mist') {
        document.body.style.backgroundImage = "url('mist.jpg')";
    }

}


//Date manage

function dateManage(dateArg) {

    let days = ["Sunday", "Monday ", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`

}
