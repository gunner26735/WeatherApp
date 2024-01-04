const express = require('express');
const service = require('../services/render');
const controller = require('../controller/controller');
const route = express.Router();

// default route
route.get("/",service.home);

// get weather
route.post("/getWeather",controller.getWeather)

module.exports = route