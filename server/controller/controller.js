const func = require("./functions");

exports.getWeather=async (req,res)=>{
    // parsing values
    var cities_name = JSON.parse(req.body);
    // finding lat and long    
    cordinates = await func.fetchCordinates(cities_name);
    
    // finding temparture
    temp_dict = await func.findTemp(cordinates);

    console.log(temp_dict);
    return res.status(200).send({"data":temp_dict});
}