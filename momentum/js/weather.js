const temp = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child")
const API_KEY = "f047a860a4ee2cdc7ecf19fd0e744d7d";
const LATITUDE = "latitude";
const LONGITUDE = "longitude";

function paintGeo(url) {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        temp.innerText = `${data.main.temp}℃ ${data.weather[0].main}`;
        city.innerText = data.name;
        });
}

function onGeoOK(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    localStorage.setItem(LATITUDE, lat);
    localStorage.setItem(LONGITUDE, lon);
    paintGeo(url);
    
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

if (localStorage.getItem(LATITUDE) !== null) {
    const lat = localStorage.getItem(LATITUDE);
    const lon = localStorage.getItem(LONGITUDE);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    paintGeo(url)
} else {
    navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
}


