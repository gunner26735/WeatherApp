$(document).ready(function () {
    console.log("Helo");
});
$('#weather_info').submit(function (event) {
    event.preventDefault();

    var unindexed_arr = $(this).serializeArray();
    var city_arr;
    $.map(unindexed_arr, function (n, i) {
        city_arr = n['value'].split(" ");
    });
    console.log(city_arr);
    data = {
        "cities": city_arr
    }

    var settings = {
        "url": "http://localhost:3000/getWeather",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    };

    $.ajax(settings).done(function (response) {
        var temps = response.data
        for(var key in temps){
            // console.log(temps[key]);
            makeWeatherCard(key,temps[key]);
        }
    });

});

function makeWeatherCard(city,tempr) {
    var weatherCards = document.querySelector('.weather-cards');
    var weatherCard = document.createElement('div');
    weatherCard.className = "weather-card"
    makeCity(weatherCard, city);
    makeTemperature(weatherCard, tempr);
    weatherCards.appendChild(weatherCard);
}

function makeCity(card, data) {
    var weatherCity = document.createElement('div');
    weatherCity.className = 'weather-city';
    weatherCity.innerText = data;
    card.appendChild(weatherCity)
}

function makeTemperature(card, data) {
    var weatherTemp = document.createElement('div');
    weatherTemp.className = 'weather-temp';
    weatherTemp.innerText = data;
    card.appendChild(weatherTemp);
}