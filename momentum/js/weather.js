const temp = document.querySelector("#weather span:first-child");
const weatherIcon = document.querySelector("#weather span:last-child");
const API_KEY = "f047a860a4ee2cdc7ecf19fd0e744d7d";

function onGeoOK(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            temp.innerText = `${data.main.temp}℃`;
            weatherIcon.innerText = data.weather[0].main;
            });
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
