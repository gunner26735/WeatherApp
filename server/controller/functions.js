const axios = require('axios');
const { fetchWeatherApi } = require('openmeteo');

exports.fetchCordinates=async (data)=>{
    var cities = data.cities;
    // to store cities with latitide and longitude data
    var cordinate = {};
    for(let i=0;i<cities.length;i++){
        // get cordinates of cities
        res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cities[i]}&count=1&language=en&format=json`)
        
        // temp variable
        let temp = {}
        temp['lat'] = res.data.results[0].latitude;
        temp['long'] = res.data.results[0].longitude
        cordinate[cities[i]]=temp;
    }
    // console.log(cordinate);
    return cordinate;
}

exports.findTemp = async (data)=>{
    var temperatures = {};
    for (var key in data){
        temperatures[key] = await fetchTemperature(data[key]['lat'],data[key]['long']);
    }
    return temperatures;
}

async function fetchTemperature(lat,long){
    var temp_total=0;
    var avg_temp;
    const params = {
        "latitude": lat,
        "longitude": long,
        "hourly": "temperature_2m",
        "forecast_days": 1,
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    // Helper function to form time ranges
    const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
    
    const hourly = response.hourly();
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
    
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
        },
    };
    
    console.log("\nFIRST");
    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        // console.log(
        //     weatherData.hourly.time[i].toISOString(),
        //     weatherData.hourly.temperature2m[i]
        // );
        //taking total of daily temperature
        temp_total +=weatherData.hourly.temperature2m[i];
    }
    // calculating average
    avg_temp = temp_total / weatherData.hourly.temperature2m.length;
    return parseFloat(avg_temp.toFixed(1));
}